import express from "express";
import dotenv from "dotenv";
import { startPublisherService } from "./publisher-service";
import { getExampleTable } from "./simple-connect";

dotenv.config();

const app = express();
const PORT = 3001;

// Define a GET route for "/domains"
app.get("/domains", async (req, res) => {
  // Create an example object
  const exampleObject = {
    domainName: "example.com",
    registrationDate: "2023-09-25",
    owner: "John Doe",
  };

  const data = await getExampleTable();

  // Send the example object as JSON response
  res.json(exampleObject);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// startPublisherService();
