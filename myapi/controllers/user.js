const mongoose = require("mongoose");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// controllers to sign up
exports.signup = async (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "email already exist",
        });
      } else {
        bcrypt.hash(req.body.password, 5, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(200).json({
                  message: "User created",
                  createdUser: user,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

// controllers to sign in

exports.signin = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "4h" }
          );
          return res.status(200).json({
            message: "Auth sucess",
            token: token,
            login: user,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// controller to patch an information about the user

exports.user_patch = async (req, res) => {
  const filter = { id: req.params.id };

  const updates = {
    email: req.body.email,
  };
  try {
    await User.findOneAndUpdate(filter, updates);
    const user = await User.findById(req.params.patchId);
    if (!user) {
      res.status(404).json({ message: "User not find" });
    }
    res.status(200).json({
      user: user,
      message: "User have been modified",
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Controllers to delete the user
exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.deleteUserId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted or already deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// controllers to get all of the works
exports.user_get_all = (req, res, next) => {
  User.find()
    .select("email _id")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        user: docs.map((doc) => {
          return {
            _id: doc._id,
            email: doc.email,
            password: doc.password,
            request: {
              type: "GET",
              url: "http://localhost:3000/user/" + doc._id,
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
