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
const getBgColor = (alertMessage, failCount) => {
  if (alertMessage === AC.HTTP_503_ERROR_RETRY_MESSAGE) return 'orange';
  if (failCount >= 3) return 'red';
  return 'indianred';
};

class AlertMessage extends PureComponent {
  render() {
    const { failCount, alertMessage } = this.props;
    if (!alertMessage) return <Container hide />;

    // server message is typically passed in verbatim. this logic replaces the server message
    // with a custom message after failing 3 times: "Robot failed... ## times"
    // better UX would be to keep the server message and alert the user of the 3rd robot failure
    // via modal component or browser alert message, etc.
    const message = (failCount < 3
      ? alertMessage
      : `Robot failed unexpectedly (${failCount} times). Please repair below.`)
    
    return (
      <Container>
        <Message bgColor={getBgColor(alertMessage, failCount)}>{message}</Message>
      </Container>
    );
  }
}

export default AlertMessage;
