import { PureComponent } from 'react';
import styled from 'styled-components';
import * as AC from '../../constants/alertConstants';

const Container = styled.div`
  ${props => props.hide && 'visibility: hidden'};
  height: 4em;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
`;

const Message = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  border: 1px solid black;
  border-radius: .5em;
  padding: .5em 1em;

  color: white;
  background-color: ${props => props.bgColor};
`;

/**
 * @summary - gets background color, considering if it's a retried req,
 *            a standard error, or if the robot failed >= 3 times
 */
const getBgColor = (alertMessage, failedCount) => {
  if (alertMessage === AC.HTTP_503_ERROR_RETRY_MESSAGE) return 'orange';
  if (failedCount >= 3) return 'red';
  return 'indianred';
};

class AlertMessage extends PureComponent {
  render() {
    const { failedCount, alertMessage } = this.props;
    if (!alertMessage) return <Container hide />;

    // message defaults to "Robot failed..." after 3 fails
    // alternative is to alert the user (via native browser or modal component, etc.)
    const message = (failedCount < 3
      ? alertMessage
      : `Robot failed unexpectedly (${failedCount} times). Please repair below.`)
    
    return (
      <Container>
        <Message bgColor={getBgColor(alertMessage, failedCount)}>{message}</Message>
      </Container>
    );
  }
}

export default AlertMessage;
