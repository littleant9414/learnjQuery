const express = require("express");
const app = express();

app.all("/jquery-jsonp", (request, response) => {
  const data = {
    name: "bob",
    city: ['taipei', 'taichung']
  };
  let str = JSON.stringify(data);
  // 接收 callback 參數
  let cb = request.query.callback;
  response.end(`${cb}(${str})`);
});

app.listen(8000, () => {
  console.log("8000端口監聽中");
});