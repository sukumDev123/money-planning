import React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Tables from './components/tables/Table';
import { CheckAddEventProvider } from './providers/CheckAddEventProvider';



const Routes: React.FC = () => <div className="App-intro">
  <Route path="/home" exact component={Tables} />
  <Redirect to='/home' />
</div>


const App: React.FC = () => {
  return (
    <div className="App">
      <CheckAddEventProvider>
        <Routes></Routes>
      </CheckAddEventProvider>
    </div>
  );
}

export default App;
