import { PureComponent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 1em;
`;

const Status = styled.div`
  text-transform: uppercase;
`;

export default class RobotStatus extends PureComponent {
  render() {
    return (
      <Container>
        <div>Status:</div>
        <Status>{ this.props.robotState || 'error' }</Status>
      </Container>
    );
  }
}
