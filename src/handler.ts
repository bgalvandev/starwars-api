import serverless from "serverless-http";
import express from "express";
import { AppRoutes } from "./presentation/routes";
import { DynamoDatabase } from "./data/dynamodb";

const app = express();

app.use(express.json());

app.use(AppRoutes.routes);

export const handler = async (event: any, context: any) => {
  // Conectar a DynamoDB
  const isConnected = await DynamoDatabase.connect();

  // Ruta de prueba para la raíz
  app.get("/", (req, res) => {
    const welcomeMessage =
      "¡Star Wars API con Serverless y Clean Architecture!";
    /*const connectionStatus = isConnected
      ? { message: "DynamoDB connected", success: true }
      : { message: "Error connecting to DynamoDB", success: false };
*/
    res.json({
      welcome: welcomeMessage,
      //connection: connectionStatus,
    });
  });

  const serverlessHandler = serverless(app);
  return serverlessHandler(event, context);
};
