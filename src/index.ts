import express from "express";
import { AuthRouter, RoomRouter, TenantRouter } from "./utils/routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // ganti sesuai origin frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", AuthRouter);
app.use("/api/room", RoomRouter);
app.use("/api/tenant", TenantRouter);

app.get("/", (_, res) => {
  res.send("ini api gweh");
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
