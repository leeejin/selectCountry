import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { Country } from "../../types/type";
import CountryCard from "../CountryCard";
import Pagination from "../Pagination";

export const itemCountPerPage: number = 20;
export const pageCountPerPage: number = 10;

function CountryList() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(0);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  const { data: countriesByPage = [] } = useQuery({
    queryKey: ["countries", { page }],
    queryFn: ({ queryKey }) =>
      api.countries.getCountriesByPage((queryKey[1] as { page: number }).page),
  });
  const { data: allCountries = [] } = useQuery({
    queryKey: ["countries"],
    queryFn: () => api.countries.getAllCountries(),
  });

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["countries", { page: page + 1 }],
      queryFn: ({ queryKey }) =>
        api.countries.getCountriesByPage(
          (queryKey[1] as { page: number }).page
        ),
    });
  }, [page, queryClient]);

  const handleSelect = (selectedCountry: Country): void => {
    setSelectedCountries((prev) => [...prev, selectedCountry]);
  };
  const handleDelete = (selectedCountry: Country): void => {
    const filteredSelectedCountries = selectedCountries.filter(
      (country) => country.id !== selectedCountry.id
    );
    setSelectedCountries(filteredSelectedCountries);
  };
  const handleSort = () => {
    const filteredCountries = [...selectedCountries].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setSelectedCountries(filteredCountries);
  };

  return (
    <div className="flex flex-col gap-4 w-3/4 mx-auto p-6">
      <h2 className="font-title text-lg mt-12">Favorite Countries</h2>
      <div>
        <button onClick={handleSort}>이름순</button>
      </div>
      <div className="card-box">
        {selectedCountries.map((selectedCountry) => (
          <CountryCard
            key={selectedCountry.id}
            country={selectedCountry}
            handleSelect={() => handleDelete(selectedCountry)}
          />
        ))}
      </div>

      <h2 className="font-title text-2xl">Countries</h2>
      <div className="card-box">
        {countriesByPage.map((country) => (
          <CountryCard
            key={country.id}
            country={country}
            handleSelect={() => handleSelect(country)}
          />
        ))}
      </div>
      <div className="text-center">
        {allCountries.length > 0 && (
          <Pagination
            maxPage={Math.ceil(allCountries.length / itemCountPerPage)}
            itemCountPerPage={itemCountPerPage}
            pageCountPerPage={pageCountPerPage}
            clickListener={(page) => setPage(page - 1)}
          />
        )}
      </div>
    </div>
  );
}

export default CountryList;
