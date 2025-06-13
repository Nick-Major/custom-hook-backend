import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS']
}));
app.use(bodyParser.json());

app.get("/data", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/error", (req, res) => {
  res.status(500).json({ status: "Internal Error" });
});

app.get("/loading", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
  res.json({ status: "ok" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The server is running on port ${port}.`));
