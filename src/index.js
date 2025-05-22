import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/db.config.js";

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1);
    });


import reportRouter from "./routes/report.routes.js";
import authRouter from "./routes/auth.routes.js";

app.use("/report", reportRouter);
app.use("/auth", authRouter);
