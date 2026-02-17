import axios from "axios";

const isServer = typeof window === "undefined";

const publicApi = process.env.NEXT_PUBLIC_API_URL;
const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!publicApi) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

if (isServer && !publicSiteUrl) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be defined when running on the server",
  );
}

const baseURL = isServer ? publicSiteUrl + publicApi : publicApi;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
