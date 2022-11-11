var Userdb = require("../model/model");

//create and save new user
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });
  user
    .save(user)
    .then((data) => {
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

//retrive and return all users
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user" });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error in retrieve user" });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error occurred while retrieve data",
        });
      });
  }
};

//update a user by userid
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Need data to update" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "cannot update user" });
      } else {
        res.status(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error on update" });
    });
};

//delete
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "cannot delete with id" });
      } else {
        res.send({
          message: "user was deleted",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user",
      });
    });
};
