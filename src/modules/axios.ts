import axios from "axios";

export const getApiClient = () => {
  return axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: `${process.env.NEXT_PUBLIC_DATA_URL}`,
  });
};
