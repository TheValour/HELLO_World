import express from 'express';
import mongoose from 'mongoose';
import { authRoute } from './controller/routes.js';
import cors from 'cors'

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionSuccessStatus:200
  })
);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);

app.use("/", authRoute);

