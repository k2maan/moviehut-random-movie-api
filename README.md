# 🎞 **MovieHut - Random Movie API**

![moviehut-wide](https://user-images.githubusercontent.com/59442907/113717489-4b5fc700-9709-11eb-980c-cb6f83ed670e.jpg)

**[MovieHut](https://moviehut.tech/api/random)** is a **free and open source**, Node.js REST API, a mini-project I did for fun really. It has **three endpoints :** **`/random`**, **`/movie/:name`**, and **`/movies`**, all explained below.

## **📌 Index**

-   [**Server and deployment**](#server-and-deployment)
-   [**API Documentation**](#api-documentation)
    -   [**Random movie**](#random-movie)
    -   [**Movie by name**](#movie-by-name)
    -   [**List of movies sorted by IMDb Rating**](#list-of-movies-sorted-by-imdb-rating)
-   [**Local setup**](#local-setup)
-   [**Contributing**](#contributing)

## **Server and deployment**

The code is running on my **free-tier EC2**. Domain from **.tech** domains routed using **Route 53**.

Deployed on **MongoDB Atlas**, the database includs **top 1000 rated movies from IMDb**.

The API is accessible **_[here](https://moviehut.tech/api/random)_**. **See the docs for further examples of usage on other endpoints.**

## **API Documentation**

> ## **Random movie**

```HTTP
GET /api/random
```

> ### **[See in browser](https://moviehut.tech/api/random)**

> ### Example Response

```json
{
    "_id": "6062ff36dd0c731bbd383d16",
    "name": "12 Angry Men",
    "releaseYear": 1957,
    "certificate": "U",
    "runtime": "96 min",
    "genre": "Crime, Drama",
    "imdbRating": 9,
    "overview": "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
    "metaScore": "96",
    "director": "Sidney Lumet"
}
```

> ## **Movie by name**

```HTTP
GET /api/movie/:name
```

> ### **[See in browser](https://moviehut.tech/api/fight%20club)**

> ### Example Response

```json
{
    "_id": "6062ff36dd0c731bbd383d1b",
    "name": "Fight Club",
    "releaseYear": 1999,
    "certificate": "A",
    "runtime": "139 min",
    "genre": "Drama",
    "imdbRating": 8.8,
    "overview": "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    "metaScore": "66",
    "director": "David Fincher"
}
```

> ## **List of movies sorted by IMDb Rating**

```HTTP
GET /api/movies
```

> ### **[See in browser](https://moviehut.tech/api/movies?page=5&limit=5)**

> ### Query parameters

| **_Parameter_** | **_Type_** | **_Description_**                                                                               | **_Example_**                                                                 |
| --------------- | ---------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **limit**       | Number     | `Minimum: 1`, `Maximum: 100`, `Default: 10` <br> The number of movies to fetch at once per page | [See in browser](https://moviehut.tech/api/movies?limit=8)                    |
| **page**        | Number     | `Minimum: 1`, `Maximum: 100`, `Default: 1` <br> The page no. for the results                    | [See in browser](https://moviehut.tech/api/movies?select=name&page=5&limit=5) |
| **select**      | String     | Fetch only the selected/particular feilds for the movie. Must be comma seperated (see example)  | [See in browser](https://moviehut.tech/api/movies?select=name,imdbRating)     |

> ### Example Response

The data array containes 5 (the limit we give) objects...

```json
{
    "status": true,
    "pagination": {
        "next": {
            "page": 6,
            "limit": 5
        },
        "prev": {
            "page": 4,
            "limit": 5
        }
    },
    "data": [{}, {}, {}, {}, {}]
}
```

## **Local setup**

> ## **Requirements**

Make sure you are atleast using the following versions:

-   Node: 14.5.5
-   npm: 6.14.11
-   MongoDB: 4.4.2

> ## **Database and Environment variables**

-   Create a MongoDB database locally or on Atlas

-   Seed the db using mongoimport (or some other way your prefer)

-   Create a file named `config.env` in the `config` folder. Add the following variables with your parameters:

```.env
NODE_ENV=<your-enviroment>

PORT=<port>

MONGO_URI=<your-local-or-atlas-mongodb-uri>
```

> ## **Installing dependencies and starting the server**

-   Do the good old:

```
npm i && nodemon server
```

## **Contributing**

All contributions, from code to docs' improvement are more than welcome. To do so you can:

-   Fork the repo

-   Clone the forked repo on your local machine

-   Create a new branch from master

-   Do your thing and commit your changes

-   Push the changes to your fork

-   Add a pull request on the project and wait until we review and merge them
