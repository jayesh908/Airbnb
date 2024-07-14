import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getall = () => {
    return formattedCountries;
  };

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };

  return { getByValue, getall };
};

export default useCountries;
