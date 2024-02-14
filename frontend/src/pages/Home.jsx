import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000")
      .then((res) => {
        setLoading(false);
        setBooks(() => res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return <div>Home</div>;
};

export default Home;
