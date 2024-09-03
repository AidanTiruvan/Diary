const express = require("express");
const app = express();
const cors = require ('cors');
const pg = require('pg');
const client = new pg.Client({
  connectionString: 'postgresql://postgres.lpcnwkysmshmvcvaymun:7y0TcRrDoRKi4O4N@aws-0-us-east-1.pooler.supabase.com:6543/postgres'
});

client.connect()

app.use(express.json())

app.use(cors());
app.get("/api/test", (req, res) => {
  res.json({ body: "test ok" });
});

app.post("/api/submit", async(req, res) => {
  const {title, date, entry} = req.body
  await client.query("INSERT INTO diary (title, date, entry) VALUES ($1, $2, $3)", [title, date, entry])
});

app.get("/api/diaries", async(req, res) => {
  const entryData = await client.query("SELECT * FROM diary")
  res.status(200).json({data: entryData.rows})
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

