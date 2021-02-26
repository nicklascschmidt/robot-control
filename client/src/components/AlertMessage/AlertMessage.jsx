import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  border: 2px solid black;
`;

const AlertMessage = () => {
  return (
    <Container>
      {'this is an alert'}
    </Container>
  );
}

export default AlertMessage;
