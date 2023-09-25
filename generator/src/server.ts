import express from "express";
import dotenv from "dotenv";
import { startPublisherService } from "./publisher-service";
import { db, getExampleTable } from "./simple-connect";
import { user } from "./schema/schema";

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
  res.status(200).json(data);
});

app.post("/domains", async (req, res) => {
  const result = await db
    .insert(user)
    .values([{ name: "luigi",  createdAt: new Date(), updatedAt: new Date() }]);

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// startPublisherService();
