import axios, { AxiosInstance } from "axios";
import CountryAPI from "./country.api";

const BASE_URL = "https://restcountries.com/v3.1"; // /all
class API {
  private client: AxiosInstance;
  countries;
  constructor() {
    this.client = axios.create({ baseURL: BASE_URL });
    this.countries = new CountryAPI(this.client);
  }
}

const api = new API();
export default api;
