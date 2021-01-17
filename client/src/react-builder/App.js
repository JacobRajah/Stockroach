import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from '../components/main-onload/main'
import SearchPage from '../components/search-page/searchPage'
import AddStocks from '../components/add-stocks/addStocks'
import StockComparer from '../components/compare-stocks/stockComparer'
import RevenueReport from '../components/revenue-reports/revenueReport'

class App extends Component {
  render() {

    const App = () => (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Main}></Route>
          <Route exact path='/search' component={SearchPage}></Route>
          <Route exact path='/addstocks' component={AddStocks}></Route>
          <Route exact path='/reports' component={RevenueReport}></Route>
          <Route exact path='/compare' component={StockComparer}></Route>
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
