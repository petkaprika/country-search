export interface RawCountry {
  name: string;
  flag: string;
  capital: string;
  region: string;
  population: number;
  languages: {
    name: string;
  }[];
}

export interface CountryCard {
  name: string;
  flag: string;
  capital: string;
  region: string;
  population: number;
  languages: string[];
}
