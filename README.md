# Scaling Full Stack Application Deployment with Docker Swarm

## tut-01: Create demo full stack application

Objective: Angular app makes REST call to NestJS API server that reads data from MongoDB.

### MongoDB for development

- Using Docker, create a `my-mongo` service.
- `MONGO_INITDB_DATABASE=tut-01` will initialize database called `tut-01`.
- `my-mongo` service is initialized with data from `my-mongo/docker-entrypoint-initdb.d/init.js`.
- Create a `my-mongo-express` to provide web based UI to view MongoDB data via `https://localhost:8081`. 
- Run with `docker-compose up`.

### NestJS application that connects to MongoDB

- MongoDB configuration:
```
MongooseModule.forRoot('mongodb://localhost/tut-01')
```
- Run with `npm run start`.

### Angular application that makes REST API to NestJS application

- REST API call:
```
this.http.get<Cat[]>('http://localhost:3000/cats').pipe(
  tap(cats => this.cats = cats)
).subscribe()
```
- Run with `ng serve`.

### Summary

Learn: Run the most simple full stack application.
Problem: Environment parameters hardcoded in Angular and NestJS.

## tut-02: Externalise Angular and NestJS Environment Properties

### Externalise NestJS Configuration
- Externalise configuration using `ConfigService`.
- `ConfigModule` loads configuration file specified by `${process.env.NODE_ENV}.env`.
- Create `dev.env` with key values.
- Start NestJS with `NODE_ENV=dev npm run start` to set `dev` environment.
- Change `MongooseModule` to use `forRootAsync`.

```
// MongooseModule.forRoot('mongodb://localhost/tut-02'),
MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongoDbUrl')
    }),
    inject: [ConfigService]
}),
```

### Externalise Angular Configuration
- `environment.ts` holds values that does not change, regardless of execution environment.
- `environment.ts` has a `config` key that will be populated with values from `assets/config.json`.
- Application fetch configuration from `./assets/config.json` before calling `bootstrapModule()`.
- To use different environment configuration, replace `./assets/config.json` that exist after a production build.

### Summary

Learn: Application configuration via environment variables.

```
tut-103: running as docker containers
production build angular image
production build nestjs image
tut-104: composing docker services
combine them
key learning:
reverse proxy with traefik
ingress network
overlay network
tut-105: scaling with docker swarm
...
