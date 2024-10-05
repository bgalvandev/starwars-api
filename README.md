<div align="center">

# Star Wars API

Esta API permite interactuar con la información de los personajes de Star Wars utilizando Serverless Framework y AWS DynamoDB. La API ofrece integración con SWAPI para obtener datos y los transforma al español.

</div>

## Tabla de Contenidos

- [Especificaciones](#especificaciones)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Endpoints](#endpoints)
  - [GET /](#get-)
  - [GET /api/swapi/people](#get-api-swapi-people)
  - [GET /api/swapi/people/:id](#get-api-swapi-peopleid)
  - [GET /api/dynamo/people](#get-api-dynamo-people)
  - [POST /api/dynamo/people](#post-api-dynamo-people)
  - [GET /api/dynamo/people/:id](#get-api-dynamo-peopleid)
- [Errores](#errores)

## Especificaciones

- **Lenguaje**: TypeScript
- **Framework**: Serverless Framework
- **Base de Datos**: AWS DynamoDB
- **Entorno**: Node.js 20.x
- **Dependencias Principales**:
  - `@aws-sdk/client-dynamodb`
  - `express`
  - `axios`
  - `dotenv`
  - `serverless-http`

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/bgalvandev/starwars-api.git
   cd starwars-api
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` basado en el archivo `.env.template` y agrega tus credenciales y configuraciones.

4. Despliega la API utilizando Serverless:

   ```bash
   serverless deploy
   ```

## Configuración

Asegúrate de tener configuradas las siguientes variables de entorno en tu archivo `.env`:

```env
SWAPI_API_URL=https://swapi.py4e.com/api
AWS_REGION=us-east-1
DYNAMODB_TABLE=People
```

## Endpoints

### GET /

Devuelve un mensaje de bienvenida.

**Respuesta de ejemplo**:

```json
{
  "welcome": "¡Star Wars API con Serverless y Clean Architecture!"
}
```

### GET /api/swapi/people

Obtiene personajes de SWAPI y los transforma al español.

**Query Params**:

- `page`: número de página (opcional, por defecto 1).

**Respuesta de ejemplo**:

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

### GET /api/swapi/people/:id

Obtiene un personaje específico de SWAPI por ID.

**Respuesta de ejemplo**:

```json
{
  "id": "1",
  "nombre": "Luke Skywalker",
  ...
}
```

### GET /api/dynamo/people

Obtiene todos los personajes de la base de datos.

**Query Params**:

- `page`: número de página (opcional, por defecto 1).

**Respuesta de ejemplo**:

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

### POST /api/dynamo/people

Crea un nuevo personaje en la base de datos.

**Cuerpo de la solicitud**:

```json
{
  "nombre": "Luke Skywalker",
  "altura": "172",
  "peso": "77",
  ...
}
```

**Respuesta de ejemplo**:

```json
{
  "message": "Personaje creado exitosamente",
  "personaje": {
    "id": "2",
    "nombre": "Luke Skywalker",
    ...
  }
}
```

### GET /api/dynamo/people/:id

Obtiene un personaje específico por ID.

**Respuesta de ejemplo**:

```json
{
  "id": "1",
  "nombre": "Luke Skywalker",
  ...
}
```

## Errores

La API utiliza códigos de estado HTTP para indicar el resultado de las operaciones. Ejemplos de respuestas de error:

- **400 Bad Request**: Solicitud incorrecta.
- **401 Unauthorized**: No autorizado.
- **404 Not Found**: Recurso no encontrado.
- **500 Internal Server Error**: Error interno del servidor.
