import React from 'react';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Thread from './components/Thread';
import {Chat} from './components/Chat';
import Dev from './components/Dev';
import { Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
  <React.StrictMode>
    <BrowserRouter>　
      <Header/>
        <Route exact path="/" component={Home} />
        <Route exact path="/thread" component={Thread} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/dev" component={Dev} />
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>
  );
}

export default App;
