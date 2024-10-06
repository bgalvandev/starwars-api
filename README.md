<div align="center">

# Star Wars API

**Star Wars API** es un proyecto construido con **Serverless Framework** y **AWS DynamoDB**. La API permite interactuar con los personajes del de Star Wars utilizando como fuente de datos **SWAPI** y traduce los objetos al español.

</div>

## Características

- **Integración con SWAPI**: Obtén información sobre personajes de Star Wars desde SWAPI y tradúcela al español.
- **AWS DynamoDB**: Crea y consulta personajes almacenados en una tabla DynamoDB.
- **Serverless Framework**: Marco de desarrollo para desplegar la API en **AWS Lambda**.
- **Endpoints REST**: Existen dos conjuntos de endpoints, uno para interactuar con DynamoDB y otro para SWAPI.
- **Arquitectura Limpia (Clean Architecture)**: Código organizado para facilitar su mantenimiento y extensibilidad.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Configuración](#configuración)
- [Despliegue](#despliegue)
- [Endpoints](#endpoints)
- [Manejo de Errores](#manejo-de-errores)

## Instalación

Para clonar y ejecutar este proyecto localmente, sigue estos pasos:

1. Clona este repositorio:

   ```bash
   git clone https://github.com/bgalvandev/starwars-api.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Compila el código TypeScript:
   ```bash
   npm run build
   ```

## Configuración

Este proyecto utiliza un archivo `.env` para la configuración de las variables de entorno. Crea un archivo basado en el `.env.template` proporcionado:

```bash
cp .env.template .env
```

Asegúrate de configurar las siguientes variables en el archivo `.env`:

```bash
SWAPI_API_URL=https://swapi.dev/api
AWS_REGION=us-east-1
DYNAMODB_TABLE=PeopleTable
```

## Despliegue

1. Inicia el despliegue a AWS con **Serverless Framework**:

   ```bash
   serverless deploy
   ```

2. Si deseas probar la API localmente antes de desplegar:
   ```bash
   serverless offline
   ```

## Endpoints

### DynamoDB Endpoints

1. **Obtener personajes de DynamoDB:**

   ```bash
   GET /api/dynamo/people
   ```

   - **Descripción**: Retorna los personajes almacenados en DynamoDB.
   - **Paginación** `page`: Número de página (por defecto 1).

     ```bash
     GET /api/dynamo/people/?page=1
     ```

   - **Respuesta**:
     ```json
     {
        "conteo": 10,
        "siguiente": "http://localhost:3000/api/dynamo/people?page=2",
        "anterior": null,
        "resultados": [
           {
              "id": "1",
              "nombre": "Luke Skywalker",
              "altura": "172",
              ...
           }
        ]
     }
     ```

2. **Obtener personaje por ID de DynamoDB:**

   ```bash
   GET /api/dynamo/people/{id}
   ```

   - **Descripción**: Obtiene un personaje por ID almacenado en DynamoDB.

   - **Respuesta** (Ejemplo):

     ```json
     {
        "id": "1",
        "nombre": "Luke Skywalker",
        "altura": "172",
        "colorCabello": "blond",
        "colorPiel": "fair",
        "colorOjos": "blue",
        ...
     }
     ```

3. **Crear un nuevo personaje en DynamoDB:**

   ```bash
   POST /api/dynamo/people
   ```

   - **Descripción**: Crea un nuevo personaje en DynamoDB.

   - **Body** (Ejemplo):

     ```json
     {
       "id": "123",
       "name": "Luke Skywalker",
       "height": "172",
       "mass": "77",
       "hair_color": "blond",
       "skin_color": "fair",
       "eye_color": "blue",
       "birth_year": "19BBY",
       "gender": "male",
       "homeworld": "Tatooine",
       "films": ["A New Hope", "The Empire Strikes Back"]
     }
     ```

   - **Respuesta** (Ejemplo):

     ```json
     {
       "message": "Personaje creado exitosamente",
       "personaje": {
         "id": "123",
         "nombre": "Luke Skywalker",
         "altura": "172",
         "masa": "77",
         "colorCabello": "blond",
         "colorPiel": "fair",
         "colorOjos": "blue",
         "añoNacimiento": "19BBY",
         "genero": "male",
         "mundoNatal": "Tatooine",
         "peliculas": ["A New Hope", "The Empire Strikes Back"]
       }
     }
     ```

### SWAPI Endpoints

1. **Obtener personajes de SWAPI:**

   ```bash
   GET /api/swapi/people
   ```

   - **Descripción**: Retorna los personajes de Star Wars directamente desde SWAPI.
   - **Paginación** `page`: Número de página (por defecto 1).

     ```bash
     GET /api/swapi/people/?page=1
     ```

   - **Respuesta**:

     ```json
     {
        "conteo": 82,
        "siguiente": "http://localhost:3000/api/swapi/people?page=2",
        "anterior": null,
        "resultados": [
           {
              "id": "1",
              "nombre": "Luke Skywalker",
              ...
           }
        ]
     }
     ```

2. **Obtener personaje por ID de SWAPI:**

   ```bash
   GET /api/swapi/people/{id}
   ```

   - **Descripción**: Obtiene un personaje por ID directamente desde SWAPI.

   - **Respuesta** (Ejemplo):
     ```json
     {
        "id": "",
        "nombre": "Luke Skywalker",
        "altura": "172",
        "masa": "77",
        "colorCabello": "blond",
        "colorPiel": "fair",
        "colorOjos": "blue",
        ...
     }
     ```

## Manejo de Errores

La API utiliza códigos de estado HTTP para indicar el estadp de las operaciones:

- **400 Bad Request**: Solicitud incorrecta.
- **401 Unauthorized**: No autorizado.
- **404 Not Found**: Recurso no encontrado.
- **500 Internal Server Error**: Error interno del servidor.
