import { AxiosInstance } from "axios";
import { APICountry } from "../types/type";

class CountryAPI {
  private client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  async getAllCountries() {
    try {
      const response = await this.client.get("/all");
      const data = response.data;
      const newData = data.map(
        ({ capital, continents, name, flags }: APICountry, index: number) => ({
          id: index,
          capital,
          continents,
          name: name.common,
          flags: flags.png,
          select: false,
        })
      );
      console.log(newData);
      return newData;
    } catch (error) {
      console.error(error);
    }
  }
}
export default CountryAPI;
