import React from 'react';
import './App.css';

import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import Signup from './Components/Signup';


const App =()=> {
  return (
    <div className="App">
       <BrowserRouter>
       <Route exact path="/" component={Signup}/>
       </BrowserRouter>
    </div>
  );
}

export default App;
