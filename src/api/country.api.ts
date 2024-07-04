import { AxiosInstance } from "axios";
import { itemCountPerPage } from "../components/CountryList/CountryList";
import { APICountry } from "../types/type";

class CountryAPI {
  private client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  async getAllCountries(offset: number) {
    try {
      const response = await this.client.get("/all");
      const data = response.data;
      const dataLength = data.length;
      const newData = data
        .slice(offset, offset + itemCountPerPage)
        .map(
          (
            { capital, continents, name, flags }: APICountry,
            index: number
          ) => ({
            id: index,
            capital,
            continents,
            name: name.common,
            flags: flags.png,
            select: false,
          })
        );
      return { newData, dataLength };
    } catch (error) {
      console.error(error);
    }
  }
}
export default CountryAPI;
