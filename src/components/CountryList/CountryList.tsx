import { useEffect, useState } from "react";
import api from "../../api/api";
import { Country } from "../../types/type";
import CountryCard from "../CountryCard";
import Pagination from "../Pagination";

export const itemCountPerPage: number = 20;
export const pageCountPerPage: number = 5;

function CountryList() {
  const [totalLength, setTotalLength] = useState<number>(0);
  const [countries, setCountries] = useState<Country[]>([]);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    async function fetchCountries() {
      const response = await api.countries.getAllCountries(offset);
      if (response) {
        const {
          newData,
          dataLength,
        }: { newData: Country[]; dataLength: number } = response;
        setCountries(newData);
        setTotalLength(dataLength);
      }
    }
    fetchCountries();
  }, [offset]);

  const handleSelect = (selectedCountry: Country): void => {
    const updatedCountries = countries.map((country) =>
      country.id === selectedCountry.id
        ? { ...country, select: !country.select }
        : country
    );
    setCountries(updatedCountries);
  };
  const handleSort = (): void => {
    const sortedCountries = [...countries].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setCountries(sortedCountries);
  };
  const setCurrentPageFunc = (page: number): void => {
    const lastOffset: number = (page - 1) * itemCountPerPage;
    setOffset(lastOffset);
  };
  return (
    <div className="flex flex-col gap-4 w-3/4 mx-auto p-6">
      <h2 className="font-title text-lg mt-12">Favorite Countries</h2>

      <div className="card-box">
        {countries?.map((selectedCountry) => {
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
        {countries?.map((country) => {
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
      {countries.length > 0 && (
        <Pagination
          itemCount={totalLength}
          itemCountPerPage={itemCountPerPage}
          pageCountPerPage={pageCountPerPage}
          clickListener={setCurrentPageFunc}
        />
      )}
    </div>
  );
}

export default CountryList;
