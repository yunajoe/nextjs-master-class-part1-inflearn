"use client";

import { useEffect, useState } from "react";

function page() {
  const [data, setData] = useState([]);
  const handleFetch = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const jsonData = await res.json();
    setData(jsonData);
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return <div>page</div>;
}

export default page;
