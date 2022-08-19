const Studio = require("../models/studio");
const mongoose = require("mongoose");

// controllers to get all of the studio's

exports.studio_get_all = async (req, res, next) => {
  Studio.find()
    .select("name description country _id studioImage")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        studio: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            description: doc.description,
            country: doc.country,
            studioImage: doc.studioImage,
            request: {
              type: "GET",
              url: "http://localhost:3000/studio/" + doc._id,
            },
          };
        }),
      };
      if (docs.length >= 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "no Studio found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// controllers to get a studio by his id

exports.studio_get_id = (req, res, next) => {
  const id = req.params.studioId;
  Studio.findById(id)
    .select("name description country _id studioImage")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// controllers to add a new studio

exports.studio_create_studio = async (req, res, next) => {
  if (!req.file) return res.send("Please upload a file");
  console.log(req.file);
  const studio = new Studio({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    country: req.body.country,
    studioImage: req.file.path,
  });
  studio
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Studio created",
        createdStudio: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// controllers to change an wrong information entered

exports.studio_patch = (req, res, next) => {
  const id = req.params.studioId;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  // to update witheout changing everything in the same time (ex: if i change name it will only change the name )
  Studio.update({ _id: id }, { $set: updateOps })
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

// controllers to delete the studio

exports.studio_delete = (req, res, next) => {
  const id = req.params.studioId;
  Studio.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
