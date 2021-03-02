import { PureComponent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 1em;
`;


export default class RobotStatus extends PureComponent {
  render() {
    return (
      <Container>
        <div>Status:</div>
        <div>{ this.props.robotState || 'error' }</div>
      </Container>
    );
  }
}
