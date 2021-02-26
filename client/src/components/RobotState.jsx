import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseServerUrl } from '../util/api.util';

function App() {
  const [robotState, updateRobotState] = useState('');

  useEffect(() => {
    const fetchAndSaveData = async () => {
      const data = await axios.get(`${baseServerUrl}/state`)
        .then(resp => {
          console.log('axios resp', resp);
          return resp.data;
        })
        .catch(err => console.log(err));

      updateRobotState(data);
    }

    fetchAndSaveData();
  }, [])

  return (
    <div>{ robotState || 'error!' }</div>
  );
}

export default App;
