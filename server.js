const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.post("/save", (req, res) => {
  const gameData = req.body;
  console.log("Received game data:", gameData);
  res.json({ message: "Game saved (mock)", data: gameData });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});