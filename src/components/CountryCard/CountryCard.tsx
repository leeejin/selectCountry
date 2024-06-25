import clsx from "clsx";
import { SelectCard } from "../../types/type";

function CountryCard({ handleSelect, country }: SelectCard) {
  return (
    <div
      className={clsx("card", {
        "border-green-500": country.select,
        "border-none": !country.select,
      })}
      onClick={() => handleSelect(country)}
    >
      <img className="w-[60px] m-auto" src={country.flags} />
      <h4 className="font-semibold">{country.name}</h4>
      <p className="text-gray-600">{country.capital}</p>
    </div>
  );
}

export default CountryCard;
