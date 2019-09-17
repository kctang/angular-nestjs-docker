# Scaling Full Stack Application Deployment with Docker Swarm

## [tut-01] Create demo full stack application

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

## [tut-02] Externalise Angular and NestJS Environment Properties

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

## [tut-03] Running Angular and NestJS via Docker Container

### Angular
- `app-ui/Dockerfile` is a multi-stage Dockerfile for Angular application.
- Use Nginx to serve production Angular build.
- Change `./assets/config.json` to `./assets/config/config.json` so that configuration can be switched to local volume (if needed).
- Configuration files stored in `config/config.*.json` can be to the image when building. Defaults to `prod`.
- Some useful Docker commands:
```
docker build -t app-ui .
docker run --name app-ui -p 80:80 -d app-ui
docker logs app-ui -f
docker exec -it app-ui /bin/sh
docker container start app-ui
docker container stop app-ui
docker container rm app-ui -f -v
```

### Changes to MongoDB Configuration

- Reconfigure MongoDB with auth to enable access from remote IP (i.e. from one docker container to another - without docker compose).
- Update `docker-entrypoint-initdb.d` to create application's user. 

### NestJS
- Dockerfile for NestJS builds the application.
- Set NODE_ENV prod environment.
- Run "npm run start:prod".
- To override environment when creating Docker container, use `docker run --name app-api -e "NODE_ENV=prod" -p 3000:3000 -d app-api`.

## [tut-04] Composing Docker Services
- Change NestJS's environment key separator from `.` to `_` to avoid need to escape characters.
- Enhance ConfigService parsing to allow overriding config keys if specified as environment properties at runtime.
- `1.rebuild.sh` builds Docker image for app-api and app-ui.
- Add `my-api` and `my-ui` to `docker-compose.yml`.
- Override `my-api`'s environment with service name for MongoDB called `my-mongo`.

To use this, just run from `tut-04`:
```
./1.rebuild.sh
docker-compose up
```

## [tut-05] Running in Docker Swarm
- Using Docker Engine, create a VirtualBox machine that runs MongoDB and MongoDB Express.
- Using Docker Engine, create a VirtualBox machines driven Docker Swarm with three nodes to run applications.
- Deploy app and ui as an application stack (`my-app`) in the Docker Swarm cluster, with scripts to scale number of containers for each service.
- For this to work, images are pushed to a private Docker Hub repository.
- Repeat the above Digital Ocean's droplets and volumes.

## [tut-06] Route Traefik
