import { PartnersModel } from "../models/partners.model";
import { withErrorHandling } from "../middlewares/error";
import { Request, Response } from "express";

const getAllPartners = withErrorHandling(
  async (req: Request, res: Response) => {
    const partners = await PartnersModel.find({});

    res.status(200).json(partners);
  }
);

const getPartner = withErrorHandling(async (req: Request, res: Response) => {
  const partnerid = req.params.id;

  const partner = await PartnersModel.findOne({ _id: partnerid });

  if (!partner) {
    res.status(404).send(`Partner with id ${partnerid} not found.`);
  } else {
    res.status(200).json(partner);
  }
});

const createPartner = withErrorHandling(async (req: Request, res: Response) => {
  const partnerBody = req.body;

  const { document } = partnerBody;

  const existingPartner = await PartnersModel.findOne({
    document: document,
  });

  if (existingPartner) {
    res.status(409).json({
      message: "Document already in use.",
    });

    return;
  }

  const newPartner = new PartnersModel(partnerBody);

  await newPartner.save();

  res.status(201).json(newPartner);
});

const searchPartner = withErrorHandling(async (req: Request, res: Response) => {
  const { lat, long } = req.query;

  const nearestPartner = await PartnersModel.findOne({
    coverageArea: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(long as string), parseFloat(lat as string)],
        },
      },
    },
  });

  if (nearestPartner) {
    res.status(200).json(nearestPartner);

    return;
  }

  res.status(404).json({
    message: "Nearest partner for given coordinates not found.",
  });
});

export { getAllPartners, getPartner, createPartner, searchPartner };
