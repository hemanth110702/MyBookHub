import axios from "axios";

const baseUrls = {
  development: "http://localhost:7000/",
  production: "",
};

const baseURL =
  process.env.NODE_ENV === "production"
    ? baseUrls.production
    : baseUrls.development;

export default axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
