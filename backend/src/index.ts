import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import Replicate from "replicate";
// import StreamrClient from "streamr-client";
import dotenv from "dotenv";
import { getTable } from "./schema";
dotenv.config();

interface TransactionData {
  code: number;
  address: string;
}

const app = new Elysia()
  .use(cors())
  .get("/", async () => {
    // const options = {
    //   method: "GET",
    //   headers: { "User-Agent": "insomnia/2023.5.8" },
    // };

    try {
      // const response = await fetch("https://api.namefake.com/", options);
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
      // const data = await response.json();

      // const replicate = new Replicate({
      //   auth: REPLICATE_API_TOKEN,
      // });

      // const output = await replicate.run(
      //   "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
      //   {
      //     input: {
      //       prompt:
      //         "Show 5 domain name ideas ending in .bnb. answer me only the domains without introduction",
      //     },
      //   }
      // );

      console.log("domain names generated");
      const data = await getTable();

      return data;
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
