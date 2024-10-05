import "dotenv/config";
import { get } from "env-var";

export const envs = {
  SWAPI_API_URL: get("SWAPI_API_URL").required().asString(),

  AWS_REGION: get("AWS_REGION").required().asString(),
  AWS_ACCESS_KEY_ID: get("AWS_ACCESS_KEY_ID").required().asString(),
  AWS_SECRET_ACCESS_KEY: get("AWS_SECRET_ACCESS_KEY").required().asString(),

  DYNAMODB_TABLE: get("DYNAMODB_TABLE").required().asString(),
};
