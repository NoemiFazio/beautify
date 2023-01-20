import styles from "./App.module.scss";
import MakeupList from "./components/MakeupList";
import Slider from "./components/Slider";
import Navbar from "./components/Navbar";
import FilterList from "./components/FilterList";

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <Slider />
      <FilterList />
      <MakeupList />
    </div>
  );
}

export default App;
