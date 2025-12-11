import app from "./server";
const PORT = 3000;

app.get("/", (_, res) => {
  res.send("ini api gweh");
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
