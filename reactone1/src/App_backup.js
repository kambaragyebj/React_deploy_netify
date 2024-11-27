//import React, { Component } from 'react';
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App(){


    const handleNameChange = () =>{

       const names = ['Bob','jackson','Dave'];

       const int = Math.floor(Math.random() * 3);

       return names[int];
    }
    

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}

        <p>

           Hello {handleNameChange()}
        </p>
        
      
      </div>
    );
}


// / class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App;
