import { useEffect, useState } from "react";
import api from "../../api/api";
import { Country } from "../../types/type";
import CountryCard from "../CountryCard";
import Pagination from "../Pagination";

export const itemCountPerPage: number = 20;
export const pageCountPerPage: number = 10;

function CountryList() {
  const [totalCountries, setTotalCountries] = useState<Country[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  useEffect(() => {
    async function fetchCountries() {
      const response = await api.countries.getAllCountries(offset);
      if (response) {
        const {
          results,
          total_pages,
        }: { results: Country[]; total_pages: number } = response;
        console.log(results, total_pages);
        setTotalCountries((prev) => prev.concat(results));
        setTotalLength(total_pages);
      }
    }
    fetchCountries();
  }, [offset]);

  const handleSelect = (selectedCountry: Country): void => {
    const updatedCountries = totalCountries.map((country) =>
      country.id === selectedCountry.id
        ? { ...country, select: !country.select }
        : country
    );
    setTotalCountries(updatedCountries);
  };
  const handleSort = (): void => {
    const sortedCountries = [...totalCountries].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setTotalCountries(sortedCountries);
  };
  const setCurrentPageFunc = (page: number): void => {
    const lastOffset: number = (page - 1) * itemCountPerPage;
    setOffset(lastOffset);
  };
  return (
    <div className="flex flex-col gap-4 w-3/4 mx-auto p-6">
      <h2 className="font-title text-lg mt-12">Favorite Countries</h2>

      <div className="card-box">
        {totalCountries?.map((selectedCountry) => {
          if (selectedCountry.select)
            return (
              <CountryCard
                key={selectedCountry.id}
                country={selectedCountry}
                handleSelect={() => handleSelect(selectedCountry)}
              />
            );
        })}
      </div>
      <div>
        <button onClick={handleSort}>이름순</button>
      </div>

      <h2 className="font-title text-2xl">Countries</h2>
      <div className="card-box">
        {totalCountries
          ?.slice(offset, offset + itemCountPerPage)
          .map((country) => {
            if (!country.select)
              return (
                <CountryCard
                  key={country.id}
                  country={country}
                  handleSelect={() => handleSelect(country)}
                />
              );
          })}
      </div>
      <div className="text-center">
        {totalCountries.length > 0 && (
          <Pagination
            maxPage={totalLength}
            itemCountPerPage={itemCountPerPage}
            pageCountPerPage={pageCountPerPage}
            clickListener={setCurrentPageFunc}
          />
        )}
      </div>
    </div>
  );
}

export default CountryList;
