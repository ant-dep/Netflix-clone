import React, { useEffect, useState } from "react";
import "./App.css";
import Row from "./components/row/Row";
import requests from "./requests";
import Banner from "./components/banner/Banner";
import Nav from "./components/nav/Nav";
import Loader from "./components/loader/Loader";

function App() {
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setvisible(true);
    }, 7500);
  }, []);

  return (
    <div className="app">
      {!visible ? (
        <Loader />
      ) : (
        <>
          <Nav />
          <Banner />
          <Row
            title="NETFLIX ORIGINALS"
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow //={true}
          />
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        </>
      )}
    </div>
  );
}

export default App;
