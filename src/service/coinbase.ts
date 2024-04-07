import axios, { AxiosResponse } from "axios";

export const getCoinbaseData = async (): Promise<AxiosResponse<any>> => {
  try {
    const resp = await axios.get("http://localhost:5000/api/coinbase");

    return resp;
  } catch (e) {
    console.error("failed to fetch current data");
    throw e;
  }
};
