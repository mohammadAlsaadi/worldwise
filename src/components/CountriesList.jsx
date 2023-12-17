import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
function CountriesList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities || cities.length === 0) return;
  <Message
    message={"Add your first city by checking on the city on the map "}
  />;

  const Countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {Countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountriesList;
