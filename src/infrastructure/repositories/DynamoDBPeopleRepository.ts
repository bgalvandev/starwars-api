import { DynamoDatabase, Person } from "../../data/dynamodb";
import { IPeopleRepository } from "../../domain/";
import { PutCommand, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { envs } from "../../config";

export class DynamoDBPeopleRepository implements IPeopleRepository {
  private tableName: string;

  constructor() {
    this.tableName = envs.DYNAMODB_TABLE || "People";
  }

  // Método para obtener todos los registros (sin paginación)
  async getAll(): Promise<{ Items: Person[]; TotalCount: number }> {
    const client = DynamoDatabase.getClient();
    const command = new ScanCommand({ TableName: this.tableName });
    const result = await client.send(command);

    // Mapea los elementos a Person y cuenta los resultados
    const items = result.Items?.map((item) => this.mapItemToPerson(item)) || [];
    const totalCount = items.length;

    // Devuelve un objeto que incluye los elementos y el conteo total
    return {
      Items: items,
      TotalCount: totalCount,
    };
  }
  // Obtener por ID
  async getById(id: string): Promise<Person | null> {
    const client = DynamoDatabase.getClient();
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { id },
    });

    const result = await client.send(command);

    return result.Item ? this.mapItemToPerson(result.Item) : null;
  }

  // Crear nuevo registro en DynamoDB
  async create(person: Person): Promise<Person> {
    const client = DynamoDatabase.getClient();
    const command = new PutCommand({
      TableName: this.tableName,
      Item: person,
    });

    await client.send(command);

    // Retornar el objeto completo que se acaba de crear
    return person;
  }

  // Mapear un elemento de DynamoDB a un objeto Person
  private mapItemToPerson(item: any): Person {
    return new Person(
      item.id,
      item.name,
      item.height,
      item.mass,
      item.hairColor || item.hair_color, // Para soportar ambos estilos
      item.skinColor || item.skin_color,
      item.eyeColor || item.eye_color,
      item.birthYear || item.birth_year,
      item.gender,
      item.homeworld,
      item.films,
      item.species,
      item.vehicles,
      item.starships,
      item.created,
      item.updated,
      item.url
    );
  }
}
