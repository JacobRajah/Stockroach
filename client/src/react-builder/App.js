import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from '../components/main-onload/main'
import SearchPage from '../components/search-page/searchPage'
import Rand1 from '../components/rand1/rand1'
import Rand2 from '../components/rand2/rand2'
import Rand3 from '../components/rand3/rand3'

class App extends Component {
  render() {

    const App = () => (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Main}></Route>
          <Route exact path='/search' component={SearchPage}></Route>
          <Route exact path='/rand1' component={Rand1}></Route>
          <Route exact path='/rand2' component={Rand2}></Route>
          <Route exact path='/rand3' component={Rand3}></Route>
        </Switch>
      </div>
    )

    return (
      <Switch>
        <App></App>
      </Switch>
    );
  }

}

export default App;
