const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env.local" });

app.use(express.json());

const posts = [
  { name: "CBIT", title: "Welcome to CBIT" },
  { name: "MGIT", title: "Welcome to MGIT" },
];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  // Make sure ACCESS_TOKEN is available and defined
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);

  res.json({ accessToken: accessToken });
});

app.use(authenticateToken);
app.get("/posts", (req, res) => {
  res.json(posts.filter((post) => post.name === req.user.name));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
