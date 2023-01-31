import styles from "./App.module.scss";
import MakeupList from "./components/MakeupList";
import Slider from "./components/Slider";
import Navbar from "./components/Navbar";
import FilterList from "./components/FilterList";
import { memo, useState } from "react";

function App() {
  const [typeKey, setTypeKey] = useState("lip liner");
  const [brandKey, setBrandKey] = useState("");

  return (
    <div className={styles.App}>
      <Navbar />
      <Slider />
      <FilterList setBrandKey={setBrandKey} setTypeKey={setTypeKey} />

      {<MakeupList brandKey={brandKey} typeKey={typeKey} />}
      {/* {console.log("APP!!!")} */}
    </div>
  );
}

export default memo(App);
