const mongoose = require("mongoose");

const Work = require("../models/work");
const Studio = require("../models/studio");

// controllers to get all of the works

exports.work_get_all = (req, res, next) => {
  Work.find()
    .select("studio title description author _id workImage")
    .populate("studio", "name")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        work: docs.map((doc) => {
          return {
            _id: doc._id,
            studio: doc.studioId,
            title: doc.title,
            description: doc.description,
            author: doc.author,
            workImage: doc.workImage,
            request: {
              type: "GET",
              url: "http://localhost:3000/work/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// controllers to get a work by his id

exports.work_get_id = (req, res, next) => {
  Work.findById(req.params.workId)
    .select("studio title description author _id workImage")
    .exec()
    .then((work) => {
      if (!work) {
        return res.status(404).json({
          message: "Work not found",
        });
      }
      res.status(200).json({
        work: work,
        request: {
          type: "GET",
          url: "http://localhost:3000/work",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// controllers to create a works

exports.work_create_work = (req, res, next) => {
  Studio.findById(req.body.studioId)
    .then((studio) => {
      if (!studio) {
        return res.status(404).json({
          message: "Studio not found",
        });
      }
      const work = new Work({
        _id: mongoose.Types.ObjectId(),
        studio: req.body.studioId,
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        workImage: req.file.path,
      });
      return work.save();
    })

    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Work stored",
        createdWork: {
          _id: result._id,
          studio: result.studio,
          title: result.title,
          description: result.description,
          author: result.author,
          workImage: result.workImage,
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/work/" + result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// controllers to patch an information

exports.work_patch = (req, res, next) => {
  const id = req.params.workId;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  // to update witheout changing everything in the same time (ex: if i change name it will only change the name )
  Work.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// controllers to delete the work

exports.work_delete = (req, res, next) => {
  Work.remove({ _id: req.params.workId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Work deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/work",
          body: {
            studioId: "ID",
            title: "String",
            description: "String",
            author: "String",
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
