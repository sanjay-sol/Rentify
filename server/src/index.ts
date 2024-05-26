import cors from "cors";
import express from "express";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Rentify....");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

