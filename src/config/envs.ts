import "dotenv/config";
import { get } from "env-var";

export const envs = {
  SWAPI_API_URL: get("SWAPI_API_URL").required().asString(),
  AWS_REGION: get("AWS_REGION").required().asString(),
  DYNAMODB_TABLE: get("DYNAMODB_TABLE").required().asString(),
};
