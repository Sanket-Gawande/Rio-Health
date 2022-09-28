
import http from "http";
import data from "./data-store.json" assert { type: "json" };
const app = http.createServer();
app.on("request", (req, res) => {
  const reqParams = req.url.split("/");
//   live status on / route
  if(req.url === "/" ){
    res.end(JSON.stringify({message : "You are live "}));
    retutn;
  }
  //   bad request if id is not present in url
  if (reqParams[1] === "projects" && reqParams.length == 2) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: "BAD REQUEST" }));
  }
  //   checking for data if id is present
  if (
    reqParams.length === 3 &&
    req.method === "GET" &&
    reqParams[1] === "projects"
  ) {
    const project = data.filter((item) => item.id == reqParams[2])[0];
    if (project) {
      res.statusCode = 200;
      res.end(JSON.stringify(project));
      return;
    } else {
      res.statusCode = 404;
      res.end();
      return;
    }
  }
  res.statusCode = 404;
  res.end();
});

app.listen(8000, (error) => {
  console.log({ error, message: "server is running on port 8000" });
});
