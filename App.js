// src/App.js

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Appbar from './components/Appbar';
import Show from './components/Show';
import Home from './components/Home'; // Import the single Home component

function App({ store }) {
  function Page() {
    switch (store.getState()) {
      case "SignUp":
        return (<div><SignUp /></div>);
      case "Login":
        return (<div><Login /></div>);
      case "Home":
        return (<div><Home /></div>); // Use Home instead of Home1/Home2
      case "Show":
        return (<div><Show /></div>);
      default:
        return (<div><Home /></div>); // Default case renders Home
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Enterprise Resource Planning</p>
      </header>
      <div className='App-body'>
        <Appbar store={store} />
        <Page />
      </div>
    </div>
  );
}

export default App;
