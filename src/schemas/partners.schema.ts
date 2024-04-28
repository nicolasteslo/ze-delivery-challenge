import { z } from "zod";

const createPartnerSchema = z.object({
  tradingName: z.string().min(3),
  ownerName: z.string().min(6),
  document: z.string(),
  coverageArea: z.object({
    type: z.string(),
    coordinates: z.array(z.array(z.array(z.array(z.number())))),
  }),
  address: z.object({
    type: z.string(),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
});

const getParnerSchema = z.object({
  id: z.string(),
});

const searchPartnerSchema = z.object({
  lat: z.string(),
  long: z.string(),
});

export { createPartnerSchema, getParnerSchema, searchPartnerSchema };
