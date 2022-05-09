
import './App.css';
import React,{useState} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import AccountSummary from './Components/account_summary';
import FundTransfer from './Components/fund_transfer';
import Login from './Components/login';
import Main from './Components/main';
import ContextProvider from './context/ContextProvider'

function App() {

  const [isAuthenticated,setIsAuthenticated]=useState(false);

  
  return (
   
    <Router>
      <Switch>
     
         <Route exact path="/">
            <Redirect to="/login" />
        </Route>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/main' component={Main}/>
        {/* <Route exact path='/account_summary' component={()=><AccountSummary authorized={isAuthenticated} />}/>
        <Route exact path='/fund_transfer' component={()=><FundTransfer authorized={isAuthenticated}/>}/> */}
        
      </Switch>
    </Router>
   


    // <div className="App">
    //   <header className="App-header">
    //     {/* <img src={logo} className="App-logo" alt="logo" /> */}
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
