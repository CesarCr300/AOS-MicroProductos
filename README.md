## IMPORTANT

This template was developed for me and you can find it here: [Repository](https://github.com/CesarCr300/NestJsTemplate)

## Description

This in NestJS template for a basic API REST with:
- [Authentication](#Authentication)
- [Authorization](#Authorization)
- [TypeORM with MYSQL](#TypeORMwithMYSQL)
- [Repository Base](#RepositoryBase)
- [Service Base](#ServiceBase)
- [Auditory Entities](#AuditoryEntities)
- Response Interceptor
- [Testing and Coverage](#TestingandCoverage)
- Swagger
- Docker

These implementions were made following the [NestJS documentation](https://docs.nestjs.com/).

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Running the with docker

```bash
# development
$ yarn run docker:dev
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

###BASIC EXPLANATION OF FILES INVOLVED:

## <a name="Authentication"></a>Authentication
The authentication module contains the necessary files for authentication, implemented using Passport with the JWT strategy.
## <a name="Authorization"></a>Authorization
The authorization files are located within the auth module: <b>roles.decorator.ts</b> and <b>roles-auth.guard.ts</b>

Those files were made following the [ NestJS documentation](https://docs.nestjs.com/).
## <a name="TypeORMwithMYSQL"></a>TypeORM with MYSQL
If you intend to continue using MySQL, you simply need to create your own <b>.env</b> file following the <b>.env.example</b>. Alternatively, you will need to modify the <b>db.config.ts</b> file.
## <a name="RepositoryBase"></a>Repository Base
This is a basic repository that implements the IRepository interface, offering CRUD operations without implementing soft delete logic.

The file accepts multiple generic classes to facilitate operations.
## <a name="ServiceBase"></a>Service Base
This basic service provides CRUD operations and requires:
- Implemention of the RepositoryBase
- Function to get the body to validate if the resource already exist
- The article used for the resource
- The resource name
- A boolean to determine if it's neccesary to check if the resource already exists

<b>IMPORTANT:</b> Soft deletion has been implemented here, along with filters to retrieve only entities with a state equal to 1.

## <a name="AuditoryEntities"></a>Auditory Entities
The files are inside the auditory module and are: <b>auditory.entity.ts</b> and <b>auditory.suscriber.ts</b>.

For this to work, your new entity needs to extend the AuditoryEntity class, and the subscriber will handle the rest.

## <a name="TestingandCoverage"></a>Testing and Coverage
For the coverage and testing configuration I followed this [link](https://dev.to/rohithart/nestjs-unit-and-e2e-testing-7pb).# AOS-MicroProductos

To connect to the MySQL Host server you need to execute this command:
CREATE USER 'root'@'%' IDENTIFIED BY 'yourpassword';
GRANT ALL PRIVILEGES ON database_name.* TO 'root'@'%';
FLUSH PRIVILEGES;

If you have another user, change the root name

And change the bin-address from /etc/mysql/mysql.conf.d/mysqld.cnf to 0.0.0.0