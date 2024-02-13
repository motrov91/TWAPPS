
Node con TypeScript - TS-Node-dev (preferido)

1. Instalar TypeScript y demás dependencias

npm i -D typescript @types/node ts-node-dev rimraf

2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)

npx tsc --init --outDir dist/ --rootDir src

3. Crear scripts para dev, build y start (Más sobre TS-Node-dev aquí)
Esto va en el archivo packege.json

  // tenemos que crear la ruta de directorios src y app.ts
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"

4. Excluir del tsconfig.json los archivos de node y dist, e incluir el src.

  "exclude": [
    "node_modules",
    "dist"
  ],

  "include": ["src"],

