import React, {Component} from 'react'
// import './main.css';
import NavBar from '../templates/navbar';

class RevenueReport extends Component { 

    render() {
        return(
            <div>
                <NavBar></NavBar>
                <h1>Here users can see a list of their transactions with
                 username stock, stock price bought, # of shares,
                 company used to buy.</h1>
                 {/* Store fake todays stock to calc 
                 revenue so we can show profits */}
            </div>
        )
    }
}

export default RevenueReport;