const express = require("express");
const app = express();
const { UserModel } = require("../models/users");
const { connectDB } = require("../config/database");
const { validateSignup } = require("../utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    validateSignup(req);
    const hash = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hash });
    await newUser.save();
    res.send("User added successfully");
  } catch (err) {
    res.send("Error in saving data" + err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (isValid) {
      res.send("Login successful!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (e) {
    res.status(400).send("Error : " + e.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await UserModel.find();
    if (!user) {
      res.send("No user found");
    } else {
      res.send(user);
    }
  } catch (e) {
    res.send("Something went wrong");
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await UserModel.find({ email: "Alice@gmail.coms" });
    if (user.length < 1) {
      res.send("No user found!!");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.send("Something went wrong");
  }
});

app.patch("/user/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  console.log(data);
  try {
    const allowed = ["about", "age", "password", "name"];
    const isAllowed = Object.keys(data).every((k) => allowed.includes(k));
    if (!isAllowed) {
      throw new Error("Invalid update");
    }
    await UserModel.findByIdAndUpdate(id, data);
    res.send("Upadated successfully");
  } catch (error) {
    res.send("Something went wrong" + error);
  }
});

connectDB()
  .then(() => {
    console.log("db connected");
    app.listen(3000, () => {
      console.log("listening to port 3000");
    });
  })
  .catch(() => {
    console.log("failed to connect");
  });
