const express = require("express");

const server = express();

module.exports = server;

// Challenge 1: Create a new route for the homepage
// server.get("/", (request, response) => {
//     response.send(`<h1>Hello world</h1>`)
// })


// Challenge 2: Create a new route at GET /colour // Challenge 3: Edit your GET /colour route to include a form in the HTML response.
// server.get("/colour", (request, response) => {
//   const hex = request.query.hex || "white"
//   const html = `
//   <style>
//   body { background-color: #${hex};
//   }
//   </style>
//   <form>
//     <input name="hex" value="${hex}"/>
//     <input name="hex-2" type="color" value="${hex}"/>

//   </form>
//   `;
//   response.send(html)
//   }
// )

// Challenge 4: Create a new route GET /cheese

const cheeses = [];

server.get("/cheese", (request, response) => {
  const html = `
    <form method="POST">
      <label for="cheese">Cheese Type</label>
      <input name="name" type="text"/>

      <label>Rating</label>
      <input name="rating" type="range" min="0" max="5"/>

      <button type="submit">Rate cheese</button>
    </form>
    <ul>
    ${cheeses}
    </ul>
    `
    response.send(html)
})
const bodyParser = express.urlencoded();

server.post("/cheese", bodyParser, (req, res) => {
  const cheeseName = req.body.name;
  const cheeseRating = req.body.rating;
  cheeses.push(cheeseName, cheeseRating);
  res.redirect("/")
})