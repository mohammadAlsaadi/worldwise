import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/FakeAuthContext";

export default function Login() {
  const navigate = useNavigate();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthincated } = useAuth();
  useEffect(
    function () {
      console.log(isAuthincated);
      if (isAuthincated) navigate("/app", { replace: true });
      else {
        return;
      }
    },
    [isAuthincated, navigate]
  );

  async function handleLogin(e) {
    e.preventDefault();
    console.log("click");
    if (email && password) await login(email, password);
    console.log(isAuthincated);
    if (isAuthincated) {
      navigate("/app");
    }
  }
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
