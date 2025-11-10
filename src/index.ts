import express from "express";
import { AuthRouter, RoomRouter, TenantRouter } from "./utils/routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/room/", RoomRouter);
app.use("/api/tenant", TenantRouter);

app.get("/", (_, res) => {
  res.send("ini api gweh");
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
