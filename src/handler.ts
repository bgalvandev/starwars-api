import serverless from "serverless-http";
import express from "express";
import { AppRoutes } from "./presentation/routes";
import { DynamoDatabase } from "./data/dynamodb";

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);

export const handler = async (event: any, context: any) => {
  app.get("/", (req, res) => {
    const welcomeMessage =
      "¡Star Wars API con Serverless y Clean Architecture!";
    res.json({
      welcome: welcomeMessage,
    });
  });
  const serverlessHandler = serverless(app);
  return serverlessHandler(event, context);
};
