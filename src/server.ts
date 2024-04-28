import app from "./app";
import mongoose from "mongoose";
import "dotenv/config";

const port = process.env.SERVER_PORT ?? "3000";

const init = async () => {
  try {
    if (!process.env.MONGO_DB_URI) {
      throw Error("MongoDB URI not found.");
    }

    await mongoose.connect(process.env.MONGO_DB_URI);

    console.log("Database connected.");

    app.listen(Number(port), "0.0.0.0", () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

init();
