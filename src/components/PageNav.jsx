import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

//NavLink is add className active to the page visit
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to={"/Product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/Pricing"}>Pricing</NavLink>
        </li>
        <li className="">
          <NavLink to={"/login"} className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
