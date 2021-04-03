import React from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import history from './Utils/history'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="Content">
          <Button onClick={() => history.push('/Home')}>
            Go to Home Page
          </Button>
          <Button onClick={() => history.push('/Admin')}>
            Go to Administrator Page
          </Button>
        </div>
      </div>
    )
  }
}

export default App;
