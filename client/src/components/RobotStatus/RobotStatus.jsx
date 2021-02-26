import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { baseServerUrl } from '../../util/api.util';

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 1em;
`;

function RobotStatus() {
  const [robotStatus, updateRobotStatus] = useState('');

  useEffect(() => {
    const fetchAndSaveData = async () => {
      const data = await axios.get(`${baseServerUrl}/state`)
        .then(resp => {
          console.log('axios resp', resp);
          return resp.data;
        })
        .catch(err => console.log(err));

        updateRobotStatus(data);
    }

    fetchAndSaveData();
  }, [])

  return (
    <Container>
      <div>Status:</div>
      <div>{ robotStatus || 'error!' }</div>
    </Container>
  );
}

export default RobotStatus;
