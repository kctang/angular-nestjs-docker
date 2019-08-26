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

...
