import express from "express";
import diaryRouter from "./routes/diaries";

const app = express();
app.use(express.json());

app.use("/api/diaries", diaryRouter);

const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Flight diary backend listening on ${PORT}`);
  });
}

export default app;
