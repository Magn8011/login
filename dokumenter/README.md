
# Programmering og udvikling af små systemer samt databaser

      EKSAMENSOPGAVE FORÅR 2022

## Funktinelle krav

I vil gerne lave en konkurrent til Den Blå Avis (DBA). I skal derfor arbejde videre med jeres **web-applikation**, men med udvidet funktionalitet. Udover "funktionelle krav” applikationen skal også opdateres så de er
**objektorienteret**, så det kan lettere udvides i fremtiden. Dertil skal dataen også gemmes i en **normaliseret database**, så data let kan tilgås.

## Tekniske krav

- Klienten (JS, HTML, CSS)
- Server/API (Node.JS & Express)
- Storage i T-SQL hvori jeres brugere og annoncer kan bo.

## Løsningsovervejelse


Den tidligere opgaven dækkede krav 1-12. med en simplet Express.js appliation som udstillet de forskellige funktioner som "views".

For at give svar til den nye tekniske krav. Applikations skal udvikles til den følgende retning.

Der er mulighed at bygge applikation med Backend for fronted arkitektur på Express JS framework. 
Express JS også give mulighed at bygge applikationer som udstille API grænsflader.


### 1. Views med API 

Den nuværende "views" bruger almindelige tekst filer som "database" og læse og opdatere data med "fs" module (fs.readFileSync, fs.writeFileSync)
Konverteres til en (file based database)
For at bruge API, skal datahåndtering opdateres til bruge API-kald ved at bruge "node-fetch" modulet.

Fordel med dette metod er vi behover ikke at ændre den tidligere kontrakter mellem brugergrænseflader og database.
Det simplet konverteres til en BFF (Backend-for-fronted) API.

Existerende appliation dækker krav 1-12 med views  prpo

Omdøbe
Viderudvikling 16-17 skal man introducere nye vies x .y.z


#### viderudviklings mulighed

Istedet at bruge express.js "server-side" rendering, en mulighed kan være at opgradere "views" til klient side rendering ved at bruge Fetch API. Dette metod kan åbne muligheden at bygge klinetet som ReactJS "single-page-applikation" 

### 2. API server

Express.Js appliation skal ustille en API gennem /api/ url prefix som præsentere de forskellige data elementer fra data modellen

API serveren skal hente data fra relationelle databasen og formattere dem til JSON Dokmenter.

#### RESTful API
Den hurtigst måde at bygge den API er at følge RESTful API standard (Representational State Transfer).

**REST Metoder**
REST-arkitekturen gør brug af fire almindeligt anvendte HTTP-metoder. Disse er:
- GET Denne metode hjælper med at tilbyde skrivebeskyttet adgang til ressourcerne.
- POST Denne metode er implementeret til at oprette en ny ressource.
- DELETE Denne metode er implementeret til at fjerne en ressource.
- PUT Denne metode er implementeret til at opdatere en eksisterende ressource eller oprette en ny.

/api/users
/api/announcer
/api/profil


Bruge API with node-fetch

```yarn install node-fetch``` for API kald
Code exemplarer til fetch API:
https://www.npmjs.com/package/node-fetch#common-usage



### 3. SQL Data base

I stedet af dokument baseret (JSON) data kilde, der skal udarbejdes en relationel datamodel.

Sqlite3 er en små SQL motor som kan installeres som npm modul i projektet. ```npm install sqlite3 --save```

```database.js``` for at oprætte database forbindelse og initalisere databasen med eksample data.


Den normaliseret database kan ses på Entity Relationship (ER) Diagram

<<diagram her>>
```sql
CREATE TABLE users (ID integer primary key, name varchar(20), email varchar(100), password varchar(100) , admin boolean, gold boolean)

CREATE TABLE announcer (ID integer primary key, name varchar(20), price integer, category varchar(100), image varchar(100), userID integer )

CREATE TABLE followers (ID integer primary key, userID integer,  announceID integer )
```

## Referencer

- https://code.tutsplus.com/tutorials/build-a-complete-mvc-website-with-expressjs--net-34168
- https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
- https://www.w3schools.in/restful-web-services/intro
- https://www.w3schools.in/restful-web-services/rest-methods
- https://www.tutorialspoint.com/expressjs/expressjs_restful_apis.htm
- https://medium.com/@codesprintpro/rest-api-using-sqlite3-nodejs-and-expressjs-f8c0c0847fe5

- https://www.restapitutorial.com/lessons/httpmethods.html

- https://www.gleek.io/blog/er-symbols-notations.html
- https://expressjs.com/en/starter/basic-routing.html
