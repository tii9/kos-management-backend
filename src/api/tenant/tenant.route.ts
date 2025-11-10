import express from "express";
import {
  createNewTenantController,
  deleteTenantByIdController,
  editTenantByIdController,
  getAllTenantsController,
  getTenantByIdController,
} from "./tenant.controller";
import { AuthMiddleware } from "../../middleware/auth.middleware";

const TenantRouter = express.Router();

TenantRouter.get("/", AuthMiddleware, getAllTenantsController);
TenantRouter.get("/:id", AuthMiddleware, getTenantByIdController);
TenantRouter.post("/", AuthMiddleware, createNewTenantController);
TenantRouter.delete("/:id", AuthMiddleware, deleteTenantByIdController);
TenantRouter.put("/:id", AuthMiddleware, editTenantByIdController);

export default TenantRouter;
