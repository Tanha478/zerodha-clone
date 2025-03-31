require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { UsersModel } = require("./model/UserModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// const allowedOrigins = [
//   "https://zerodha-clone-frontend-ndqw.onrender.com",
//   "https://zerodha-clone-dashboard-fdei.onrender.com",
// ];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests from allowed origins or undefined (for tools like Postman)
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, origin);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // Ensure credentials are allowed
//   })
// );

// app.options("*", (req, res) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     return res.sendStatus(200); // Preflight success
//   }
//   res.sendStatus(403); // Forbidden for unauthorized origins
// });

// // Debugging middleware for logging incoming requests
// app.use((req, res, next) => {
//   console.log("Incoming Request:", req.method, req.headers.origin);
//   next();
// });


app.use(cors({
  origin: ["https://zerodha-clone-frontend-ndqw.onrender.com", "https://zerodha-clone-dashboard-fdei.onrender.com"],
  credentials: true,
}));

app.use((req, res, next) => {
  console.log("Incoming Request:", req.method, req.headers.origin);
  next();
});


app.use((req, res, next) => {
  const allowedOrigins = ["https://zerodha-clone-frontend-ndqw.onrender.com", "https://zerodha-clone-dashboard-fdei.onrender.com"];
  const origin = req.headers.origin || "https://zerodha-clone-frontend-ndqw.onrender.com";
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});



app.use(bodyParser.json());
app.use(cookieParser());

// Signup Route
app.post("/signup", async (req, res) => {
  
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UsersModel({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
console.log("Token generated:", token); // Logs the generated token for debugging
    res.cookie("auth_token", token, { httpOnly: true, secure: true, sameSite: "none" }); 
    res.status(201).json({ message: "User created successfully" });
    
  } catch (error) {
    console.error("Error during signup:", error); // Logs the error for debugging
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await UsersModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("auth_token", token, { httpOnly: true, secure: true, sameSite: "none" ,  maxAge: 24 * 60 * 60 * 1000,  }); 
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

// Logout route
app.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
});

app.get("/validateToken", (req, res) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Token is valid" });
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
});


app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();

  res.send("Order saved!");
});

app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri);
  console.log("DB started!");
});
