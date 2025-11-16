import express from "express";

const app = express();

app.get("/api/ping", (_req, res) => {
  res.json({ message: "pong" });
});

const PORT = 3001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Patientor backend running on port ${PORT}`);
  });
}

export default app;
