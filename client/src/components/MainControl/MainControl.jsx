import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 2em;
  
  padding: 3em;
  background-color: white;
  border: 2px solid black;
`;

const MainControl = ({ children }) => {
  return (
    <Container>
      { children }
    </Container>
  );
}

export default MainControl;
