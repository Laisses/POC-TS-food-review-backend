import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {routes} from "./routes.ts";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const main = () => {
    routes(app);

    app.listen(PORT, () => {
        console.log(`server running on port: ${PORT}`);
    });
};