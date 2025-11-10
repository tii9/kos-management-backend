import express from "express";
import {
  createNewRoomController,
  deleteRoomByIdController,
  editRoomByIdController,
  getAllRoomController,
  getRoomByIdController,
} from "./room.controller";
import { AuthMiddleware } from "../../middleware/auth.middleware";

const RoomRouter = express.Router();

RoomRouter.get("/", AuthMiddleware, getAllRoomController);
RoomRouter.get("/:id", AuthMiddleware, getRoomByIdController);
RoomRouter.post("/", AuthMiddleware, createNewRoomController);
RoomRouter.delete("/:id", AuthMiddleware, deleteRoomByIdController);
RoomRouter.put("/:id", AuthMiddleware, editRoomByIdController);

export default RoomRouter;
