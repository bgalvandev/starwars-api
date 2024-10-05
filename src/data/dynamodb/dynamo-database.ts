import { DynamoDB } from "@aws-sdk/client-dynamodb";

export class DynamoDatabase {
  private static client: DynamoDB;

  // Método para inicializar la conexión a DynamoDB
  static async connect(): Promise<boolean> {
    if (!this.client) {
      try {
        // Inicializa el cliente de DynamoDB
        this.client = new DynamoDB({});
        console.log("DynamoDB connected");
        return true; // Conexión exitosa
      } catch (error) {
        console.error("Error connecting to DynamoDB:", error);
        return false; // Conexión fallida
      }
    }
    return true; // Ya está conectado
  }

  // Método para obtener el cliente de DynamoDB
  static getClient(): DynamoDB {
    if (!this.client) {
      throw new Error(
        "DynamoDB client is not initialized. Call connect() first."
      );
    }
    return this.client;
  }
}
