import express from "express";
import groupController from "../controllers/groupController";

const groups = express();

groups.get("/", groupController.allGroups);

groups.get("/:id", groupController.groupInfo);

groups.post("/", groupController.createGroup);
groups.get("/:id/members", groupController.getGroupMembers);

groups.post("/:id/members", groupController.joinGroup);
groups.delete("/:id/members", groupController.exitGroup);

groups.get("/:id/messages", groupController.getGroupMessages);
groups.get("/:id/messages/:messageId", groupController.getGroupMessageInfo);

groups.post("/:id/messages", groupController.createGroupMessage);

export default groups;
