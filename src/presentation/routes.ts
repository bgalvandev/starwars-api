import { Router } from "express";
import { DynamoPeopleRoutes } from "./people/dynamo/router";
import { SwapiPeopleRoutes } from "./people/swapi/router";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/dynamo", DynamoPeopleRoutes.routes);
    router.use("/api/swapi", SwapiPeopleRoutes.routes);

    return router;
  }
}
