import styles from "./index.module.scss";
import { useEffect, useState } from "react";

export default function InfiniteScroll({ url, limit, render, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [endpoint, setEndpoint] = useState(`${url}?limit=${limit || 50}`);

  return (
    <>
      {/* <input type="text"></input>;<span>title</span>
      <span>title</span>
      <span>title</span>
      <span>title</span>
      <span>Loading...</span>
      <span>Error</span> */}
    </>
  );
}
