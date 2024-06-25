export type APICountry = {
  capital: string[];
  continents: string[];
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
}; //capital[0] :수도, continents[0]: 대륙, name.comment : 이름, flags.png :이미지

export type Country = {
  capital: string;
  continents: string;
  name: string;
  flags: string;
  id: number;
  select: boolean;
};

export interface SelectCard {
  handleSelect: (selectedContry: Country) => void;
  country: Country;
}
