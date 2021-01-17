import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import './graph.css';

class Graph extends Component { 

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right'
    }

    render() {
        return(
            <div className="graph">
                <Line
                data={{chartData:{
                labels: this.props.dataLabels,
                datasets:[
                    {
                        label: 'Population',
                        data: this.props.dataPoints,
                        fill: false,
                        backgroundColor: [
                            'rgba(92, 103, 125, 0.6)',
                        ]
                    }
                ]
            }}}
                // width={"50%"}
                // height={50}
                options={{ 
                    title:{
                        display: this.props.displayTitle,
                        text:'Largest Cities in Massachusetts',
                        fontSize: 17
                    },
                    legend:{
                        display: this.props.displayLegend,
                        position: this.props.legendPosition
                    },
                    maintainAspectRatio: false,
                    responsive: true,

                }}
                />            
            </div>
        )
    }
}

export default Graph;