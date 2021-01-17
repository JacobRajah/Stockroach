import React, {Component} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../templates/Title';

// Generate Sales Data

function SearchableGraph(props) {
  const theme = useTheme();
  return (
    <React.Fragment>
      {/* <Title>{props.title}</Title> */}
      <ResponsiveContainer>
        <LineChart
          data={props.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} tick={{fontSize: 10}}/>
          <YAxis stroke={theme.palette.text.secondary} domain={['dataMin', 'dataMax']} tick={{fontSize: 10}}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Price ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

class Graph extends Component {

  render() {
    return (
      <React.Fragment>
        <SearchableGraph data={this.props.data}
                         title={this.props.title}
                            ></SearchableGraph>
      </React.Fragment>
    )
  }
}

export default Graph