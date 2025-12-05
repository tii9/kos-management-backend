import express from "express";
import {
  createNewRoomController,
  deleteRoomByIdController,
  editRoomByIdController,
  getAllRoomController,
  getAvailableRoomController,
  getRoomByIdController,
} from "./room.controller";
import { AuthMiddleware } from "../../middleware/auth.middleware";

const RoomRouter = express.Router();

RoomRouter.get("/", AuthMiddleware, getAllRoomController);
RoomRouter.get("/available_room", AuthMiddleware, getAvailableRoomController);
RoomRouter.get("/:id", AuthMiddleware, getRoomByIdController);
RoomRouter.post("/", AuthMiddleware, createNewRoomController);
RoomRouter.delete("/:id", AuthMiddleware, deleteRoomByIdController);
RoomRouter.put("/:id", AuthMiddleware, editRoomByIdController);

export default RoomRouter;
