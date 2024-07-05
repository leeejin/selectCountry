import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import { Country } from "../../types/type";
import CountryCard from "../CountryCard";
import Pagination from "../Pagination";

export const itemCountPerPage: number = 20;
export const pageCountPerPage: number = 10;

function CountryList() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(0);
  const formRef = useRef<HTMLInputElement | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);

  const { data: countriesByPage = [] } = useQuery({
    queryKey: ["countries", { page }],
    queryFn: ({ queryKey }) =>
      api.countries.getCountriesByPage((queryKey[1] as { page: number }).page),
    placeholderData: keepPreviousData,
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

  useEffect(() => {
    setCountries(countriesByPage);
  }, [countriesByPage]);
  const handleSelect = (selectedCountry: Country): void => {
    if (!selectedCountries.includes(selectedCountry))
      setSelectedCountries((prev) => [...prev, selectedCountry]);
  };
  const handleDelete = (selectedCountry: Country): void => {
    const filteredSelectedCountries = selectedCountries.filter(
      (country) => country.id !== selectedCountry.id
    );
    setSelectedCountries(filteredSelectedCountries);
  };
  const handleFiltering = () => {
    const searchValue = formRef.current?.value.trim();
    if (searchValue) {
      const filteredCountries = [...allCountries].filter((country) =>
        country.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setCountries(filteredCountries);
      return;
    }
    const filteredCountries = [...countries].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setCountries(filteredCountries);
  };

  return (
    <div className="flex flex-col gap-4 w-3/4 mx-auto p-6">
      <h2 className="font-title text-lg mt-12">Favorite Countries</h2>

      <div className="card-box">
        {selectedCountries.map((selectedCountry) => (
          <CountryCard
            key={selectedCountry.id}
            country={selectedCountry}
            handleSelect={() => handleDelete(selectedCountry)}
          />
        ))}
      </div>
      <div>
        <button onClick={handleFiltering}>이름순</button>
        <input
          ref={formRef}
          className="border p-1.5 m-2 rounded"
          placeholder="나라이름을 입력해주세요"
        />
        <button onClick={handleFiltering}>검색</button>
      </div>
      <h2 className="font-title text-2xl">Countries</h2>
      <div className="card-box">
        {countries.map((country) => (
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
