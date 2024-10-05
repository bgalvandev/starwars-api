import { Request, Response } from "express";
import { CustomError } from "../../../domain";
import { DynamoDBPeopleRepository } from "../../../infrastructure";
import { envs } from "../../../config";
import axios from "axios";

export class SwapiPeopleController {
  private peopleRepository: DynamoDBPeopleRepository;

  constructor() {
    this.peopleRepository = new DynamoDBPeopleRepository();
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  private transformPeople = (people: any[]) => {
    return people.map((person: any) => ({
      id: person.id || "",
      nombre: person.name,
      altura: person.height,
      masa: person.mass,
      colorCabello: person.hair_color || person.hairColor,
      colorPiel: person.skin_color || person.skinColor,
      colorOjos: person.eye_color || person.eyeColor,
      añoNacimiento: person.birth_year || person.birthYear,
      genero: person.gender,
      mundoNatal: person.homeworld,
      peliculas: person.films,
      especies: person.species,
      vehiculos: person.vehicles,
      navesEstelares: person.starships,
      creado: person.created,
      editado: person.edited,
      url: person.url,
    }));
  };

  getPeopleFromSwapi = async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page) || 1;

      const swapiResponse = await axios.get(
        `${envs.SWAPI_API_URL}/people/?page=${page}`
      );
      const swapiPeople = swapiResponse.data.results;

      // Transformar los resultados a español
      const transformedPeople = this.transformPeople(swapiPeople);

      // Construir las URLs de siguiente y anterior dinámicamente
      const baseUrl = `${req.protocol}://${req.get("host")}/api/swapi/people`;
      const siguiente = swapiResponse.data.next
        ? `${baseUrl}/?page=${page + 1}`
        : null;

      const anterior = swapiResponse.data.previous
        ? `${baseUrl}/?page=${page - 1}`
        : null;

      res.json({
        conteo: swapiResponse.data.count,
        siguiente: siguiente,
        anterior: anterior,
        resultados: transformedPeople,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  // Ruta para obtener un personaje por ID desde SWAPI
  getPersonByIdFromSwapi = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      // Obtener datos de la API SWAPI
      const swapiResponse = await axios.get(
        `${envs.SWAPI_API_URL}/people/${id}`
      );
      const swapiPerson = swapiResponse.data;

      const transformedPerson = this.transformPeople([swapiPerson]);
      res.json(transformedPerson[0]);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
