import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import dbConn from "./src/utils/db.js";
import userRoute from "./src/routes/userRoute.js";
import userContactRoute from "./src/routes/userContactRoute.js";

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : [];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoute);
app.use('/api/usersContacts', userContactRoute);

dbConn();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
