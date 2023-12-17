import { Link, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, date, emoji, id, position } = city;
  const { currentCity, deleteCity } = useCities();
  const navigator = useNavigate();

  async function handleDelete(e) {
    // await deleteCity(id);
    e.preventDefault();
    await deleteCity(id);
    navigator("/app/cities");
  }
  return (
    <li>
      {/**Here we set the query String for the url to make these states global between pages */}
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id && styles["cityItem--active"]
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
