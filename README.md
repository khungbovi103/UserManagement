## Setup and Development

### Frontend

### Installation
To use and develop for this project, you first need to install the necessary libraries used in the project.

**Pre-installation requirements:**

A computer with Node version >= `16.x` installed.

**Installation steps:**

**Step 1:** In the root directory of the repo, `cd` to `frontend` directories, install the libraries listed in the `package.json` file using the following command:

Using npm

```shell
npm install
```

Or using yarn
```shell
yarn install
```

**Step 2:** Once the installation is complete, use the command `npm run dev` to run all the modules in the repo.

### Backend

The backend is made with the Spring Boot version 3.3.2, Java 17 and a MongoDB access.

Before you begin, ensure you have the following installed on your machine:

* Java 11 or later
* Maven 3.3 or later
* MongoDB 4.0 or later

## Project Structure
The project follows a standard Maven project structure:

```
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── example
│   │   │           └── userManagement
│   │   │               ├── controller
│   │   │               ├── entity
│   │   │               ├── repository
│   │   │               └── service
│   │   ├── resources
│   │   │   ├── application.properties
│   │   │   └── other-config-files
│   └── test
│       ├── java
│       └── resources
└── pom.xml
```

**Installation steps:**

**Step 1:** In the root directory of the repo, `cd` to `backend` directories, use Maven to download the necessary dependencies using the following command:

```shell
mvn clean install
```

**Step 2:** Setup Mongo DB

Ensure that MongoDB is installed and running on your local machine or remote server. The default connection URI is mongodb://localhost:27017.

**Step 2:** Running Appication by using following command:

```shell
mvn spring-boot:run
```
The backend application should now be running at [http://localhost:8088](http://localhost:8088).
