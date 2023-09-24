import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

interface TransactionData {
  code: number;
  address: string;
}

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello World!!!")
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
