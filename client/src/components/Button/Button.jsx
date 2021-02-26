import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: .5em 1em;
`;

const buttonData = {
  start: {},
  repair: {},
  place: {},
  done: {},
  reset: {},
}

const Button = ({ type, onClick }) => {
  
  return (
    <StyledButton {...{ onClick }}>
      { type }
    </StyledButton>
  );
}

export default Button;
