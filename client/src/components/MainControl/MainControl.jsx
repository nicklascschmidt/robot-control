import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;

  display: flex;
  flex-flow: column nowrap;
  gap: 2em;
  
  padding: 2em;
  background-color: white;
  border-radius: .5em;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.2);
`;

const MainControl = ({ children }) => {
  return (
    <Container>
      { children }
    </Container>
  );
}

export default MainControl;
