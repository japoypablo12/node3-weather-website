const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000; // sETUP FOR HEROKU

//
// Directory of file need to call, DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath));

// HOME PAGE
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "John Paul Pablo",
  });
});

// ABOUT PAGE
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "John Paul Pablo",
  });
});

// HELP PAGE
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "If you need help, I'll help you",
    name: "John Paul Pablo",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      } else {
        // CALLBACK CHAINING
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            res.send({ error });
          }
          res.send({
            location: location,
            forecastData: forecastData,
            address: req.query.address,
          });
        });
      }
    }
  );
});

// TESTING
// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "You must provide a search term",
//     });
//   }
//   console.log(req.query.search);
//   res.send({
//     products: [],
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("404pages", {
    title: "404pages",
    name: "Andrew Mead",
    errorMessage: "Help article not found",
  });
});
// 404 Pages
app.get("*", (req, res) => {
  res.render("404pages", {
    title: "404pages",
    name: "Andrew Mead",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up port ${port}`);
});
