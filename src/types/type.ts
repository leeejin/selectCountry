export type APICountry = {
  capital: string[];
  continents: string[];
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
};

export type Country = {
  capital: string;
  continents: string;
  name: string;
  flags: string;
  id: number;
  select: boolean;
};
