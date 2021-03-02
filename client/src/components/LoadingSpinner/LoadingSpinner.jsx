import { PureComponent } from 'react';
import styled from 'styled-components';
import { Loader } from 'react-feather';

const Container = styled.div`
  position: absolute;
  top: .5em;
  right: .5em;

  justify-content: center;
  display: ${props => props.isLoading ? 'flex' : 'none'};
`;

const StyledLoader = styled(Loader)`
  animation: spin 2s infinite linear;
  color: grey;
  stroke-width: 1.5px;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export default class LoadingSpinner extends PureComponent {
  render() {
    const { isLoading } = this.props;
    return (
      <Container isLoading={isLoading}>
        <StyledLoader size='2em' />
      </Container>
    );
  }
}
