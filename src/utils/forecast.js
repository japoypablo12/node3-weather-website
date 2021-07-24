const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=bcb71105f581dfe7e485b0a109662eba&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service");
    } else if (body.success === false) {
      callback("Unable to find location");
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out, but it feels like ${body.current.feelslike} degrees as of ${body.current.observation_time} ${body.location.localtime}`
      );
    }
  });
};

// const url =
//   "http://api.weatherstack.com/current?access_key=bcb71105f581dfe7e485b0a109662eba&query=37.8267,-122.4233&units=f";

// // requesting data from weatherstack
// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to weather service");
//   } else if (response.body.error) {
//     console.log("Unable to find location");
//   } else {
//     console.log(
//       `${response.body.current.weather_descriptions[0]}.It is currently ${response.body.current.temperature} degrees out, but it feels like ${response.body.current.feelslike} degrees`
//     );
//   }
// });

module.exports = forecast;
