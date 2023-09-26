import express from "express";
import dotenv from "dotenv";
import { startSubscriberService } from "./subscriber-service";
import { db, getTable } from "./simple-connect";
import { NewUser, user } from "./schema/schema";

dotenv.config();

const app = express();
const PORT = 3001;

// Define a GET route for "/domains"
app.get("/domains", async (req, res) => {
  const data = await getTable();

  // Send the example object as JSON response
  res.status(200).json(data);
});

app.post("/domains", async (req, res) => {
  const message = ["fitnessescape.bnb", "workoutwave.bnb"];
  console.log(message);

  // Create an array to hold the objects to be inserted into the database
  const valuesToInsert: NewUser[] = [];

  // Iterate through the message array and create objects with the "name" field
  for (const name of message as string[]) {
    const newItem: NewUser = {
      name, // Use the string from the message as the "name" field
      role: "bnb",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    valuesToInsert.push(newItem);
  }

  console.log(
    "🚀 ~ file: server.ts:26 ~ app.post ~ valuesToInsert:",
    valuesToInsert
  );

  // Insert the array of objects into the database
  const result = await db.insert(user).values(valuesToInsert);
  console.log("<<<Insert DB>>>");
  console.log("Insert result: ", result);

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

startSubscriberService();
