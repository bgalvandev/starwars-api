import { Router } from "express";
import { SwapiPeopleController } from "./controller";

export class SwapiPeopleRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new SwapiPeopleController();

    router.get("/people", controller.getPeopleFromSwapi);
    router.get("/people/:id", controller.getPersonByIdFromSwapi);
    return router;
  }
}
