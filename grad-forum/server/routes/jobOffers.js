import express from "express";
import jobOffersController from "../controllers/jobOffersController";

const jobOffers = express();

jobOffers.get("/", jobOffersController.allJobOffers);

jobOffers.get("/:id", jobOffersController.jobOfferInfo);

jobOffers.post("/", jobOffersController.createJobOffer);
jobOffers.get("/:id/comments", jobOffersController.getJobOfferComments);
jobOffers.post("/:id/comments", jobOffersController.createjobOfferComment);

export default jobOffers;
