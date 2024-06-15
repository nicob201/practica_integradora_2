import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  cart: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts",
      },
    },
  ],
  role: { type: String, default: "user" },
});

const usersCollection = mongoose.model(userCollection, userSchema);

export default usersCollection;
