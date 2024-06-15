import usersCollection from "../dao/models/user.js";

// Devuelve todos los usuarios
async function getUsers(req, res) {
  try {
    let users = await usersCollection.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
}

// Devuelve el usuario dado un ID
async function getUserById(req, res) {
  let { uid } = req.params;
  try {
    let user = await usersCollection.findById({ _id: uid });
    if (!user) {
      return res.status(404).send({ status: "error", error: "User not found!" });
    }
    res.send(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).send({ status: "error", error: "Failed to get user!" });
  }
}

// Elimina un usuario dado un ID
async function deleteUserById(req, res) {
  let { uid } = req.params;
  try {
    let user = await usersCollection.findByIdAndDelete({ _id: uid });
    if (!user) {
      return res.status(404).send({ status: "error", error: "User not found!" });
    }
    res.send({ status: "success", message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ status: "error", error: "Failed to delete user!" });
  }
}

export { getUsers, getUserById, deleteUserById };
