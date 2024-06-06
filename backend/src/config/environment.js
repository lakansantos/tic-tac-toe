import dotenv from "dotenv";

dotenv.config();

export const API_VERSION = process.env.API_VERSION || "v1";
export const API_VERSION_URL = `/api/${API_VERSION}`;
