import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button.jsx';

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 1em;
`;

const ButtonsDisplay = () => {
  return (
    <Container>
      <Button type='repair' onClick={() => console.log('make api post call')} />
      <Button type='reset' onClick={() => console.log('make api post call')} />
      <Button type='done' onClick={() => console.log('make api post call')} />
    </Container>
  );
}

export default ButtonsDisplay;
