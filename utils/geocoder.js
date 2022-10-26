import nodegeocoder from "node-geocoder"
import { config } from "dotenv";

config()

const options = {
    provider: process.env.geocoder_provider,
    httpAdapter: "https",
    apiKey: process.env.geocoder_api_key,
    formatter:null
};

const geocoder = nodegeocoder(options);

export default geocoder