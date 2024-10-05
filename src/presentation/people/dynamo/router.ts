import { Router } from "express";
import { DynamoPeopleController } from "./controller";

export class DynamoPeopleRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new DynamoPeopleController();

    router.get("/people", controller.getPeopleFromDynamo);
    router.post("/people", controller.createPerson);
    router.get("/people/:id", controller.getPersonByIdFromDynamo);
    return router;
  }
}
