import styles from "./index.module.scss";

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <div className={styles.loaderCircle}></div>
    </div>
  );
};
export default Loader;
