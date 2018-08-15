# server
Server for "travelGram"

**Public Route**

| Route      | HTTP   |     Description    |
|------------|--------|:------------------:|
| /signup    | POST   | Sign up a user     |
| /login     | POST   | Manual login       |

**Users Route**

| Route      | HTTP   |     Description    |
|------------|--------|:------------------:|
| /users     | GET    | Get users          |
| /users/:id | GET    | Get one user       |
| /users     | POST   | Sign up a user     |
| /users/:id | DELETE | Delete a user      |
| /users/:id | PUT    | Update a user      |

**Posts routes**

| Route               | HTTP   |      Description      |
|---------------------|--------|:---------------------:|
| /posts              | GET    | Get posts             |
| /posts/:id          | GET    | Get one post          |
| /posts/user/:userId | GET    | Get posts by uploader |
| /posts              | POST   | Save a post           |
| /posts/:id          | DELETE | Delete a post         |
| /posts/:id          | PUT    | Update a post         |
