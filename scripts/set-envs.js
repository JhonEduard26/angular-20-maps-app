const { writeFileSync, mkdirSync } = require("fs");

require("dotenv").config();

const targetPath = "./src/environments/environment.ts";
const targetPathDev = "./src/environments/environment.development.ts";
const mapboxToken = process.env["MAPBOX_TOKEN"];

if (!mapboxToken) {
  throw new Error("MAPBOX_TOKEN is already set in the environment.");
}

const envFileContent = `
export const environment = {
  mapboxToken: "${mapboxToken}",
};
`;

mkdirSync("./src/environments", { recursive: true });

writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
