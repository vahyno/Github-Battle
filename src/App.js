import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Popular from './components/Popular';
import Nav from './components/Nav';
import Home from './components/Home';
import Battle from './components/Battle';
import Results from './components/Results';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
        <Nav />
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route exact path='/battle' component={ Battle } />
          <Route path='/battle/results' component={ Results } />
          <Route path='/popular' component={ Popular } />
          <Route render={()=>{
            return <p>Not Found</p>
            }} />
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
