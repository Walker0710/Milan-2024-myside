import './App.css';
import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';


const socket = io.connect('http://localhost:5000');

function App() {
  const [number, setNumber] = useState(0);
  // const [socket, setSocket] = useState(null);

  useEffect(() => {
    

    socket.on('connect', () => { console.log("Connected to backend") });
    socket.on('updated', (data) => {setNumber(data); console.log("Updated",data)});

    return () => {
      socket.off('connect');
      socket.off('updated');
    }
  }, [setNumber]);
  const update = () => {
    console.log("updating");
    socket.emit('updates', number);
}
  return (
    
      <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={
      <div>
        <p>Score:{number}</p>
        <button onClick={()=>setNumber(prev=>prev+1)}>+</button>
        <button onClick={()=>setNumber(prev=>prev-1)}>-</button>
        <button onClick={update}>Update</button>
        <div>New_score:{number}</div>
      </div>
    }/>
      {/* <Route path="/scor" element={<div>Score:{number}</div>}/> */}
      </Routes>
    </div>
    </Router>
  );
}

export default App;
