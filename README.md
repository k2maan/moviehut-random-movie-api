# 🎬 **MovieHut - Random Movie API**

![moviehut-wide](https://user-images.githubusercontent.com/59442907/113717489-4b5fc700-9709-11eb-980c-cb6f83ed670e.jpg)

**_MovieHut_** is a **_free and open source_**, Node.js REST API, a mini-project I did for fun really. It has three endpoints, `/random`, `/movie/:name`, and `/movies`, all explained below.

The database includs top 1000 rated movies from IMDb. **_Feel free to use and/or improve on this project!_**

**Domain and usage/examples in the docs are on my TODO.** Meanwhile the API is accessible [here](http://3.86.45.46/api/random).

## **API Documentation**

> ## **Random movie**

```
GET /api/random
```

> ### Response

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

```
GET /api/movie/:name
```

> ### Response

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

```
GET /api/movies
```

> ### Query parameters

| **_Parameter_** | **_Type_** | **_Description_**                                                                       |
| --------------- | ---------- | --------------------------------------------------------------------------------------- |
| **limit**       | Number     | `Minimum: 1`, `Maximum: 100`, `Default: 10` <br> The number to show at once (per page). |
| **page**        | Number     | `Minimum: 1`, `Maximum: 100`, `Default: 1` <br> The page no. for the results            |
| **select**      | String     | `Minimum: 1`, `Maximum: 100`, `Default: 1` <br> Fetch only particular feilds for the    |

> ### Response

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
            "limit": 10
        }
    },
    "data": [{}, {}, {}, {}, {}]
}
```
