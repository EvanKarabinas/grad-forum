import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded());
app.use(express.json());
console.log(__dirname + "/media");

app.use("/api", routes);

export default app;
