import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from DALL.E!",
  });
});

const startServer = async () => {
  try {
    // connectDB(process.env.MONGODB_URL);
    //currently not using the db so dont use it
    app.listen(process.env.PORT || 8080, () =>
      console.log(
        `Server started on port ${process.env.PORT || 8080}`,
        app.settings.env
      )
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
