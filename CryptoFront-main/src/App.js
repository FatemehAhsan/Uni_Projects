import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import MoreInfo from './components/MoreInfo'
import Search from './components/Search'

class App extends Component {
  render() {
    return (
       <BrowserRouter>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/MoreInfo/:id" element={<MoreInfo/>}/>
            </Routes>
          </div>
       </BrowserRouter>
      
    );
  }
}

export default App;
