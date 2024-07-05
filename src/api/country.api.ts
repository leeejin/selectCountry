import { AxiosInstance } from "axios";
import { itemCountPerPage } from "../components/CountryList/CountryList";
import { Country } from "../types/type";

class CountryAPI {
  private client: AxiosInstance;
  private index: number = 0;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  async getAllCountries(offset: number) {
    try {
      const response = await this.client.get("/all");
      const data = response.data;
      const total_pages: number = Math.ceil(data.length / itemCountPerPage);

      const results: Country[] = Array.from(
        { length: offset + itemCountPerPage },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_) => {
          const item = data[this.index];
          if (!item) {
            return null;
          }

          const result: Country = {
            id: this.index,
            capital: item.capital || [""],
            name: item.name.common,
            flags: item.flags.png,
            select: false,
          };
          this.index++;
          return result;
        }
      ).filter((item) => item !== null);
      return { results, total_pages };
    } catch (error) {
      console.error(error);
    }
  }
}
export default CountryAPI;
