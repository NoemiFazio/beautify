import styles from "./App.module.scss";
import MakeupList from "./components/MakeupList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <MakeupList />
    </div>
  );
}

export default App;
