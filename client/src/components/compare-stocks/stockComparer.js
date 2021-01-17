import React, {Component} from 'react'
// import './main.css';
import NavBar from '../templates/navbar';

class StockComparer extends Component { 

    render() {
        return(
            <div>
                <NavBar></NavBar>
                <h1>Here Users can choose stocks and compare trends</h1>
            </div>
        )
    }
}

export default StockComparer;