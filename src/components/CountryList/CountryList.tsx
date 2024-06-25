import { useEffect, useState } from "react";
import api from "../../api/api";
import { Country } from "../../types/type";
import CountryCard from "../CountryCard";

function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    async function fetchCountries() {
      const response = await api.countries.getAllCountries();
      setCountries(response);
    }
    fetchCountries();
  }, []);

  const handleSelect = (selectedCountry: Country) => {
    const updatedCountries = countries.map((country) =>
      country.id === selectedCountry.id
        ? { ...country, select: !country.select }
        : country
    );
    setCountries(updatedCountries);
  };

  return (
    <div className="flex flex-col gap-4 w-3/4 mx-auto p-6">
      <h2 className="font-bold text-center text-lg mt-12">
        Favorite Countries
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {countries.map((selectedCountry) => {
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
      <h2 className="font-bold text-center text-2xl">Countries</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {countries
          ?.sort((a, b) => a.id - b.id)
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
    </div>
  );
}

export default CountryList;
