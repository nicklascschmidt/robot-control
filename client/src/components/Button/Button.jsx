import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: .5em 1em;
  text-transform: capitalize;

  ${props => props.isDisabled && `
    pointer-events: none;
    opacity: 0.4;
  `};
`;

const Button = ({ type, onClick, isDisabled }) => {
  
  return (
    <StyledButton {...{ onClick, isDisabled }}>
      { type }
    </StyledButton>
  );
}

export default Button;
