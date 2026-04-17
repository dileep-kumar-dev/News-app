// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<News key="general" category="general" />} />
            <Route path="/business" element={<News key="business" category={"business"} />} />
            <Route path="/entertainment" element={<News key="entertainment" category={"entertainment"} pageSize={9} />} />
            <Route path="/general" element={<News key="general" category={"general"} pageSize={9} />} />
            <Route path="/health" element={<News key="health" category={"health"} pageSize={9} />} />
            <Route path="/science" element={<News key="science" category={"science"} pageSize={9} />} />
            <Route path="/sports" element={<News key="sports" category={"sports"} pageSize={9} />} />
            <Route path="/technology" element={<News key="technology" category={"technology"} />} />
          </Routes>
        </Router>
      </>
    )
  }
}

