import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button.jsx';
import { buttonOptionsByRobotState } from './ButtonsDisplay.data.jsx';

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 1em;

  height: 2em;
`;

const ButtonsDisplay = ({ isLoading, handlePostRobotActionApiCall, robotState }) => {
  if (!robotState) return null;

  const buttonOptions = buttonOptionsByRobotState[robotState];
  
  return (
    <Container>
      {buttonOptions.map((type, idx) => {
        return (
          <Button
            key={`${type}-${idx}`}
            type={type}
            onClick={() => handlePostRobotActionApiCall(type)}
            isDisabled={isLoading}
          />
        );
      })}
    </Container>
  );
};

export default ButtonsDisplay;
