import { useEffect, useState } from "react";
import api from "../../api/api";
import { Country } from "../../types/type";
import CountryCard from "../CountryCard";

function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  useEffect(() => {
    async function fetchCountries() {
      const response = await api.countries.getAllCountries();
      setCountries(response);
    }
    fetchCountries();
  }, []);

  const handleSelect = (selectedCountry: Country) => {
    const filteredCountries = countries.filter(
      (country) => country.name !== selectedCountry.name
    );
    setCountries(filteredCountries);
    setSelectedCountries((prev) => [...prev, selectedCountry]);
  };
  const handleDelete = (selectedCountry: Country) => {
    const filteredCountries = selectedCountries.filter(
      (country) => country.name !== selectedCountry.name
    );
    setCountries((prev) => [...prev, selectedCountry]);
    setSelectedCountries(filteredCountries);
  };
  return (
    <div className="flex flex-col gap-4 w-3/4 mx-auto p-6">
      <h2 className="font-bold text-center text-lg mt-12">
        Favorite Countries
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {selectedCountries.map((selectedCountry) => (
          <CountryCard
            key={selectedCountry.id}
            country={selectedCountry}
            handleSelect={() => handleDelete(selectedCountry)}
          />
        ))}
      </div>
      <h2 className="font-bold text-center text-2xl">Countries</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {countries
          ?.sort((a, b) => a.id - b.id)
          .map((country) => (
            <CountryCard
              key={country.id}
              country={country}
              handleSelect={() => handleSelect(country)}
            />
          ))}
      </div>
    </div>
  );
}

export default CountryList;
