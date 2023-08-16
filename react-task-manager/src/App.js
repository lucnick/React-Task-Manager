// Importin React, axios, and primary CSS file
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Bootstrap Imports
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';

// Component Imports
import Welcome from './components/Welcome';
import Logo from './components/Logo';
import dataLogo from './assets/data_tracker_logo.png';


// The main function running the front-end app

function App() {

  // Handles a user sending data to the server
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/write-file', { text: userInput });
      console.log('Text sent to server');
      setUserInput('')
    } catch (error) {
      console.error('Error sending text to server', error);
    }
  };


  // Handles the user-made List-Group
  const [userInputsList, setUserInputsList] = useState([]);

  // Connects to localhost 5000 (Express server) to update userInput.txt
  const fetchAndUpdateData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-data');
      setUserInputsList(response.data.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  // Ensures that the list group updates live on set interval
  useEffect(() => {
    fetchAndUpdateData();
    const intervalId = setInterval(fetchAndUpdateData, 800); // 0.8 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  // Handles the user removing an item from the list-group

  const handleRemoveClick = async (indexToRemove) => {
    try {
      await axios.post('http://localhost:5000/remove-data', { index: indexToRemove });
      console.log('Text removed from server');
      fetchAndUpdateData(); // Refresh the list after removal
    } catch (error) {
      console.error('Error removing text from server', error);
    }
  };


  // Our return function creating the visible html

  return (
    <div className="App background">
    <Container>
      <div>
        <div className="d-flex flex-row">
          <div className="p-2 flex-column col-6 my-auto">
            <Welcome greeting='Welcome back, ' user='Nicholas' />
          </div>
          <div className="p-4 flex-column col-1 float-right">
            <Logo img={dataLogo} width='330' height='200' classes='slide float-right'/>  
          </div>
        </div>
      </div>
    </Container>
    
    <Container>
      <div className="d-flex p-5 flex-row">
        <div className="p-3 flex-column col-4">
          <h2>
            Task Manager
          </h2>
          <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSubmit();
            }
          }}
          placeholder="Set reminder..."
          />
          <button type="button" onClick={handleSubmit}>Add to List</button>
        </div>
        <div className="d-flex p-5 col-6 flex-column">
          <ul className="list-group">
              {userInputsList.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between">
                  <div className="flex-grow-1">{item}</div>
                  <button
                    key={index}
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveClick(index)}>
                    Remove
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Container>
    </div>

  );
}

export default App;

