import React, {Component} from 'react'
// import './main.css';
import NavBar from '../templates/navbar';
import Graph from '../graphing/graph';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from '../templates/Dashboard';
import './searchPage.css';


  const values = [
    { metric: 'ema_50'},
    { metric: 'ema_250'},
    { metric: 'mom_50'},
    { metric: 'mom_250'},
    { metric: 'rsi_50'},
    { metric: "rsi_250"},
    { metric: "open"},
    { metric: "high"},
    { metric: "low"},
    { metric: "close"},
    { metric: "volume"}
  ];

function ComboBox() {

    return (
      <Autocomplete
        id="combo-box-demo"
        options={values}
        getOptionLabel={(option) => option.metric}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      />
    );
  }

export default function SearchPage() {
  const classes = useStyles();

  return(
    <div className="root">
      <NavBar></NavBar>
      <main className={classes.content}>
        <h1 className="Header">SearchPage</h1>
        <div className = "SearchBox">
            <ComboBox></ComboBox>
            <div className="SearchGraph">
                <Graph legendPosition="bottom" displayTitle={true} displayLegend = {false} metrics = "ema_50"/>    
            </div>
      </div>
      </main>
    </div>
)


}

// class SearchPage extends Component { 

//     render() {
//         return(
//             <div className = "root">
//               <NavBar></NavBar>
//               <main className = "content">
//                 <h1 className="Header">SearchPage</h1>
//                 <div className = "SearchBox">
//                     <ComboBox></ComboBox>
//                     <div className="SearchGraph">
//                         <Graph legendPosition="bottom" displayTitle={true} displayLegend = {false} metrics = "ema_50"/>    
//                     </div>
//               </div>
//               </main>
//             </div>
//         )
//     }
// }

// export default SearchPage;