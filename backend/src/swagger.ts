import swaggerAutogen from "swagger-autogen";
import path from "path";

const doc = {
  info: {
    version: "1.0.0",
    title: "My API",
    description:
      "Documentation automatically generated by the <b>swagger-autogen</b> module.",
  },
  host: "localhost:8000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "User",
      description: "Endpoints",
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be "header", "query" or "cookie"
      name: "X-API-KEY", // name of the header, query parameter or cookie
      description: "any description...",
    },
  },
};

const outputFile = "../api-spec.json";
const endpointsFiles = [path.join(__dirname, "./index.ts")];

swaggerAutogen()(outputFile, endpointsFiles, doc);
