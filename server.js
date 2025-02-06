const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
app.use(express.json()); //Middleware for JSON data

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI , {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Sample API Route
app.get('/server' , (req , res) => {
    res.send('Hello , Backend is working!...');
});

const PORT = 2611;
app.listen(PORT , () => console.log(`Server is running on : http://localhost:${PORT}/server`));


const User = require("./models/user");

// Create User
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
