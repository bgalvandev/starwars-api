import { Request, Response } from "express";
import { CustomError } from "../../../domain";
import { DynamoDBPeopleRepository } from "../../../infrastructure";

export class DynamoPeopleController {
  private peopleRepository: DynamoDBPeopleRepository;
  private readonly DEFAULT_LIMIT = 10;

  constructor() {
    this.peopleRepository = new DynamoDBPeopleRepository();
  }

  private handleError(error: unknown, res: Response) {
    const statusCode = error instanceof CustomError ? error.statusCode : 500;
    const message =
      error instanceof CustomError ? error.message : "Internal Server Error";
    console.log(error);
    return res.status(statusCode).json({ error: message });
  }

  private transformPerson(person: any) {
    return {
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
    };
  }

  private createPaginationLinks(
    req: Request,
    page: number,
    totalCount: number
  ) {
    const baseUrl = `${req.protocol}://${req.get("host")}${
      req.originalUrl.split("?")[0]
    }`;
    const siguiente =
      (page - 1) * this.DEFAULT_LIMIT + this.DEFAULT_LIMIT < totalCount
        ? `${baseUrl}?page=${page + 1}`
        : null;

    const anterior = page > 1 ? `${baseUrl}?page=${page - 1}` : null;

    return { siguiente, anterior };
  }

  getPeopleFromDynamo = async (req: Request, res: Response) => {
    try {
      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = this.DEFAULT_LIMIT;

      // Obtener todos los datos de DynamoDB
      const { Items: peopleFromDB, TotalCount } =
        await this.peopleRepository.getAll();

      const startIndex = (page - 1) * limit;
      const paginatedPeople = peopleFromDB.slice(
        startIndex,
        startIndex + limit
      );

      // Transformar los resultados
      const transformedResults = paginatedPeople.map(this.transformPerson);

      // Crear enlaces de paginación
      const { siguiente, anterior } = this.createPaginationLinks(
        req,
        page,
        TotalCount
      );

      res.json({
        conteo: TotalCount, // Total de registros
        siguiente,
        anterior,
        resultados: transformedResults,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  createPerson = async (req: Request, res: Response) => {
    try {
      // Crear el personaje usando el repositorio
      const newPerson = await this.peopleRepository.create(req.body);

      // Retornar el personaje creado transformado
      res.status(201).json({
        message: "Personaje creado exitosamente",
        personaje: this.transformPerson(newPerson),
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getPersonByIdFromDynamo = async (req: Request, res: Response) => {
    try {
      const person = await this.peopleRepository.getById(req.params.id); // Buscar personaje por ID

      if (!person) {
        return res.status(404).json({ error: "Personaje no encontrado" });
      }

      res.json(this.transformPerson(person));
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
