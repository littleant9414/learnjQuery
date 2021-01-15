const express = require("express");
const app = express();

app.all("/jquery", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  const data = {
    name: "jack",
    age: 19
  };
  // response.send("hello jquery ajax");
  response.send(JSON.stringify(data));
});

app.all("/delay", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  setTimeout(() => {
    response.send("hello jquery ajax");
  }, 1000);

});

app.listen(8000, () => {
  console.log("8000端口監聽中");
});