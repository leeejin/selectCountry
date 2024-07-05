import { AxiosInstance } from "axios";
import { itemCountPerPage } from "../components/CountryList/CountryList";
import { APICountry } from "../types/type";

class CountryAPI {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getCountriesByPage(page: number) {
    const allCountries = await this.getAllCountries();
    const start = page * itemCountPerPage;
    const end = itemCountPerPage * (page + 1);
    const countriesByPage = allCountries.slice(start, end);

    return countriesByPage;
  }

  async getAllCountries() {
    try {
      const response = await this.client.get<APICountry[]>("/all");
      const countries = response.data.map((country, index: number) => ({
        id: index,
        capital: country.capital || [""],
        name: country.name.common,
        flags: country.flags.png,
        select: false,
      }));

      return countries;
    } catch (error) {
      return [];
    }
  }
}
export default CountryAPI;
