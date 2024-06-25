import { PropsWithChildren } from "react";
import { SelectCard } from "../../types/type";

function CountryCard({ handleSelect, country }: PropsWithChildren<SelectCard>) {
  return (
    <div
      className="border-none rounded shadow-md hover:shadow-lg p-3"
      onClick={() => handleSelect(country)}
    >
      <img className="w-[60px] m-auto" src={country.flags} />
      <h4 className="font-semibold">{country.name}</h4>
      <p className="text-gray-600">{country.capital}</p>
    </div>
  );
}

export default CountryCard;
