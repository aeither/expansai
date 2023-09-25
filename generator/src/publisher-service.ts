import StreamrClient from "streamr-client";
import Replicate from "replicate";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.REPLICATE_API_TOKEN)
  throw new Error("REPLICATE_API_TOKEN not found");
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

export const DOMAIN_STREAM_ID =
  "0x5052936d3c98d2d045da4995d37b0dae80c6f07f/test-weather";

function getRandomCategory(categories: string[]) {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

// Example usage:
const categories = [
  "Technology",
  "Health and Wellness",
  "Travel and Adventure",
  "Food and Cooking",
  "Fashion and Style",
  "Fitness and Exercise",
  "Business and Finance",
  "Home and Decor",
  "Entertainment and Movies",
  "Sports and Athletics",
  "Education and Learning",
  "Art and Creativity",
  "Science and Innovation",
  "Music and Audio",
  "Pets and Animals",
  "Automotive and Vehicles",
  "News and Media",
  "Real Estate and Property",
  "Gaming and eSports",
  "Hobbies and Crafts",
];

function arrayToPhrase(inputArray: Array<string>) {
  // Join the array elements into a single string
  const phrase = inputArray.join("");

  // Remove leading and trailing whitespace and return the result
  return phrase.trim();
}

// Function to generate a single data point
export const generateDomains = async () => {
  const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,
  });

  const randomCategory = getRandomCategory(categories);
  const output = await replicate.run(
    "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
    {
      input: {
        prompt: `Show 10 domain name ideas ending in .bnb related to ${randomCategory}`,
      },
    }
  );

  return arrayToPhrase(output as string[]);
};

export const startPublisherService = async () => {
  const streamr: StreamrClient = new StreamrClient({
    auth: {
      privateKey: process.env.PRIVATE_KEY || "",
    },
  });

  // We prentend that 1 sec equals 1 min in this example
  setInterval(async () => {
    const domainNames = await generateDomains();
    await streamr.publish(DOMAIN_STREAM_ID, domainNames);
    console.log("published:", domainNames);
  }, 30_000);
};
startPublisherService();
