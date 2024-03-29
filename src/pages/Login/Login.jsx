import styles from "./index.module.scss";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";

const Login = ({ setUser }) => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) return;
    setUser({ name: name, email: email });
    dispatch({ type: "SET_LOGIN" });
    localStorage.setItem("username", name);
    localStorage.setItem("email", email);
    navigate("/dashboard");
  };

  return (
    <section className={styles.Login}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className={styles.row}>
          <label htmlFor="name" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            className={styles.input}
            id="name"
            value={name}
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            className={styles.input}
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button name="Login button" type="submit">
          Login
        </Button>
      </form>
    </section>
  );
};

export default memo(Login);
