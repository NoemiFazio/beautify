// import styles from "./index.module.scss";
import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import styles from "./index.module.scss";

const Login = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email);
    if (!name || !email) return;
    setUser({ name: name, email: email });
    navigate("/dashboard");
  };

  return (
    <section className={styles.Login}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login </h1>
        <div className={styles.row}>
          <label htmlFor="name" className={styles.label}>
            name
          </label>
          <input
            type="text"
            className={styles.input}
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="email" className={styles.label}>
            email
          </label>
          <input
            type="email"
            className={styles.input}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className={`${styles.btn} ${styles.btnBlock}`}>
          login
        </button>
      </form>
    </section>
  );
};

export default memo(Login);
