import React, {Component} from 'react'
import './revenueReport.css';
import NavBar from '../templates/navbar';
/* Here users can see a list of their transactions with
username stock, stock price bought, # of shares,
company used to buy. Store fake todays stock to calc 
revenue so we can show profits */

function GainPanel(props) {
    return(
        <div className="sum-panel-1">
            <h4>Gains</h4>
            <h4>{props.gains}</h4>
        </div>
    )
}

function LossPanel(props) {
    return(
        <div className="sum-panel-2">
            <h4>Losses</h4>
            <h4>{props.losses}</h4>
        </div>
    )
}

function Transactions(props) {
    return (
        <div className="transactions">
            <h4>Hello World</h4>
        </div>
    )
}

function Zone(props) {
    return (
        <div className="area">
            <GainPanel gains={props.gains}></GainPanel>
            <LossPanel losses={props.losses}></LossPanel>
            <Transactions></Transactions>
        </div>
    )
}

class RevenueReport extends Component {
    
    constructor() {
        super();
        this.state = {
            gain: '$3,024.00',
            loss: '$0.00'
        }
    }

    render() {
        return(
            <div className="report-page">
                <NavBar></NavBar>
                <Zone gains={this.state.gain} losses={this.state.loss}></Zone>
            </div>
        )
    }
}

export default RevenueReport;