import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
const corsOptions = {
  origin: 'http://example.com', // Allow only this origin
  methods: ['GET', 'POST'], // Allow only these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


export default app;