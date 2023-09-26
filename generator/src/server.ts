import dotenv from "dotenv";
import express from "express";
import { startPublisherService } from "./publisher-service";
dotenv.config();

const app = express();
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Publish domain suggestions
startPublisherService();
