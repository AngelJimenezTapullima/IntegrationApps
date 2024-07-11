import express from "express";
import morgan from "morgan"
import tienda from "./routes/techstore.routes";

const app = express();

//Settings
app.set("port", 4000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use(tienda);

export default app;