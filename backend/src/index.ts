import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import StreamrClient from "streamr-client";
import { domainListGenerator } from "./utils";

interface TransactionData {
  code: number;
  address: string;
}

export const DOMAIN_STREAM_ID =
  "0x5052936d3c98d2d045da4995d37b0dae80c6f07f/test-weather";

const app = new Elysia()
  .use(cors())
  .get("/", async () => {
    const options = {
      method: "GET",
      headers: { "User-Agent": "insomnia/2023.5.8" },
    };

    try {
      const response = await fetch("https://api.namefake.com/", options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data.name;
    } catch (err) {
      console.error(err);
      throw err; // Re-throw the error to propagate it to the caller, if needed
    }

    // return domains;
  })
  .get("/:name", async ({ params: { name } }) => {
    const response = await fetch(
      `https://api.prd.space.id/v1/getAddress?tld=bnb&domain=${name}`
    );
    const data: TransactionData = await response.json();
    return data.address; // return 0x0000000000000000000000000000000000000000 if does not exist
  })
  .listen(8080);

console.log(
  `🦊 Elysia is running at on port ${app.server?.port}... \n Open: http://localhost:8080`
);

// export const startPublisherService = () => {
//   const streamr: StreamrClient = new StreamrClient({
//     auth: {
//       privateKey: process.env.PRIVATE_KEY || "",
//     },
//   });

//   // We prentend that 1 sec equals 1 min in this example
//   setInterval(async () => {
//     const dataPoint = generateDataPoint();
//     await streamr.publish(WEATHER_STREAM_ID, dataPoint);
//     console.log("published:", dataPoint);
//   }, 1000);
// };
// startPublisherService();
