import React from 'react';
import './App.css';
import { Route, Redirect, NavLink } from 'react-router-dom';
import { CheckAddEventProvider } from './providers/CheckAddEventProvider';
import Home from './components/home/Home';
import MoneyPlanning from './components/planning/MoneyPlanning';

const PortInvestment: React.FC = () => <div></div>

const Routes: React.FC = () => <div className="App-intro">
  <Route path="/home" component={Home} />
  <Route path="/moneyplanning" component={MoneyPlanning}></Route>
  <Route path="/portInvestment" component={PortInvestment} />
  {/* <Redirect to='/home' /> */}
</div>

const Header: React.FC = () => <div className="header-body">
  <ul>
    <li>
      <NavLink to="/home" className="nav-link-custom" activeClassName="nav-link-active" >Home</NavLink>
    </li>
    <li>
      <NavLink to="/moneyplanning" className="nav-link-custom" activeClassName="nav-link-active" >Money Planning</NavLink>
    </li>

    <li>
      <NavLink to="/portInvestment" className="nav-link-custom" activeClassName="nav-link-active" >Calculator DCA</NavLink>
    </li>
  </ul>
</div>

const App: React.FC = () => {
  return (
    <div className="App">
      <CheckAddEventProvider>
        <Header></Header>
        <Routes></Routes>
      </CheckAddEventProvider>
    </div>
  );
}

export default App;
