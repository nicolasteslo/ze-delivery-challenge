import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";

import partnersRoute from "./routes/partners.route";

const app = express();

app.use(
  compression({
    level: 1,
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/partners", partnersRoute);

export default app;
