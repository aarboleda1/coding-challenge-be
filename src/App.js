import React, { Component } from 'react';
import Table from './components/Table';
import './stylesheets/normalize.css';
import './stylesheets/main.css';

class App extends Component {
  render() {
    return (
      <div className="main-container">
				<Table/>
      </div>
    );
  }
}

export default App;
