const fs = require('fs');
require('dotenv').config();

const envDir = './src/environments';
const envFile = `${envDir}/environment.ts`;

// Verificar si la carpeta "environments" existe, si no, crearla
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Contenido del archivo environment.ts
const envConfig = `
export const environment = {
  production: true,
  SERVICE_ID: "${process.env.SERVICE_ID}",
  TEMPLATE_ID: "${process.env.TEMPLATE_ID}",
  PUBLIC_KEY: "${process.env.PUBLIC_KEY}",
  EMAIL:"${process.env.EMAIL}"
};
`;

// Escribir o sobrescribir environment.ts
fs.writeFileSync(envFile, envConfig);
console.log("✔ Archivo environment.ts generado correctamente.");
