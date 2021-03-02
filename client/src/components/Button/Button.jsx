import { PureComponent } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: .5em 1em;
  text-transform: capitalize;

  ${props => props.isDisabled && `
    pointer-events: none;
    opacity: 0.4;
  `};
`;

class Button extends PureComponent {
  render() {
    const { type, onClick, isDisabled } = this.props;
    return (
      <StyledButton {...{ onClick, isDisabled }}>
        { type }
      </StyledButton>
    );
  }
}

export default Button;
