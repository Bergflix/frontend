import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundImage from "./components/BackgroundImage";
import Loading from "./components/Loading";

import Backend from "./classes/Backend";
import Pages from "./pages";

const App = () => {
  const [loading, setLoading] = useState(Backend.loaded);
  const [background, setBg] = useState('');
  const setBackground = src => background !== src && setBg(src);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => Backend.onLoad(() => setLoading(false)));
  if (!loading) return <Loading />;

  return (
    <div id={"container"}>
      <Router>
        <BackgroundImage image={background} />
        <Header userIsLoggedIn={userIsLoggedIn} />
        <Route render={({ location }) => <Pages location={location} setBackground={setBackground} />} />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
