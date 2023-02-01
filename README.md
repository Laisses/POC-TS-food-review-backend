# Eat, Drink, Review - API

This project is a proof of concept requested by Driven Education as part of their bootcamp program.

It's a REST API made using Node.js, Express, and TypeScript. It uses PostgreSQL and was deployed with [Render](https://edreview-api.onrender.com).

## Routes

```
GET: /analytics

GET: /places

POST: /places
Body: {"name": "Geranium", "category": "restaurant"}

PUT: /places/:id
Body: {"name": "Geranium", "category": "restaurant"}

PATCH: /places/:id
Body: {"rating": "great"}

DELETE: /places/:id
```

## User Interface

The front-end of this project was made using React.js

You can find the repo for it here: [GitHub Repository](https://github.com/Laisses/POC-TS-food-review) or you can visit the website here: [Eat, Drink, Review](https://eat-drink-review.vercel.app/)
