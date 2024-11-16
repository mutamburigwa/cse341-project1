const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const db = mongodb.getDatabase().db();
    const users = await db.collection("users").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase().db();
    const user = await db.collection("users").findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: error.message });
  }
};

const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  const user = {
    ffirstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .insertOne(user);
  if (response.acknoledged > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user.");
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const user = {
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    ipaddress: req.body.ipaddress,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .replaceOne({ _id: userId }, user);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user.");
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .deleteOne({ _id: userId });
  if (response.deleteCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the user.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
