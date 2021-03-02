import { Component } from 'react';
import LayoutContainer from './components/LayoutContainer/LayoutContainer.jsx';
import MainControl from './components/MainControl/MainControl.jsx';
import RobotStatus from './components/RobotStatus/RobotStatus.jsx';
import ButtonsDisplay from './components/ButtonsDisplay/ButtonsDisplay.jsx';
import CommandHistory from './components/CommandHistory/CommandHistory.jsx';
import AlertMessage from './components/AlertMessage/AlertMessage.jsx';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.jsx';
import {
  getRobotStateFromApi,
  postRobotActionToApi,
  getErrorMessageFromErrorHtmlData,
} from './util/api.util';
import * as RSC from './constants/robotStateConstants';
import * as AC from './constants/alertConstants';


/**
 * @summary - GET robot state on mount
 *          - POST action on button click
 *          - Update status from POST resp, re-GET status on server fail
 *          - Retry POST req on 503 error
 *          - loading handled by incr/decr loadingStack at the start/end of each call
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStack: 0,
      alertMessage: '',
      robotState: '',
      failCount: 0,
      commandHistory: [],
    };
  }

  componentDidMount() {
    this.fetchRobotStateAndUpdateLocalState();
  }

  /**
   * @summary - fetch robot state and pass to RobotStatus
   *          - incr failCount if robot fails
   */
  fetchRobotStateAndUpdateLocalState = async () => {
    this.startLoading();

    await getRobotStateFromApi()
      .then(({ data: robotState }) => {
        this.setState({ robotState });
        if (robotState === RSC.FAILED) this.incrementFailCount();
      })
      .catch(() => this.setState({ alertMessage: AC.HTTP_GENERIC_ERROR }))
      .finally(this.clearLoading);
  }

  /**
   * @summary - post robot action to server on Button click
   *          - log each command to display in CommandHistory
   *          - retry the call on 503 error (limit to 2 retries to avoid spamming server)
   */
  handlePostRobotActionApiCall = async (action, isRetry = false, retryCount = 0) => {
    this.startLoading();

    // delay the API call if retrying after hitting 503 error
    if (isRetry) await new Promise(resolve => setTimeout(resolve, 1500))

    this.logActionToCommandHistory(action, isRetry);

    await postRobotActionToApi(action)
      .then(({ data }) => this.handlePostRobotActionSuccess(data))
      .catch((err) => this.handlePostRobotActionFail(err, action, retryCount))
      .finally(this.clearLoading);
  }

  handlePostRobotActionSuccess = (respData) => {
    const robotState = respData.state;
    this.setState({ robotState });
    if (robotState === RSC.FAILED) this.incrementFailCount();
    this.clearAlertMessage();
  }

  handlePostRobotActionFail = (err, action, retryCount) => {
    // when POST call fails, robot's state might have changed to FAILED unexpectedly
    // need to re-fetch robot state to check if it failed and incrementFailCount() if so
    this.fetchRobotStateAndUpdateLocalState();

    const { response } = err || {};
    const { status, data } = response || {};
    
    if (status !== 503) {
      this.setState({ alertMessage: getErrorMessageFromErrorHtmlData(data) });
    }

    // on 503 err, retry the POST call, but limit how many times the call is retried
    // to avoid continuous loop on repeated 503s
    if (status === 503) {
      if (retryCount < 3) {
        this.setState({ alertMessage: AC.HTTP_503_ERROR_RETRY_MESSAGE });
        this.handlePostRobotActionApiCall(action, true, retryCount + 1)
      } else {
        this.setState({ alertMessage: AC.HTTP_503_ERROR });
      }
    }
  }

  /**
   * @summary - prepends new actions to state.commandHistory
   *          - adds `(Retry)` to the action if 503 retry
   */
  logActionToCommandHistory = (action, isRetry) => {
    this.setState(prevState => {
      const newCommand = {
        action: `${action}${isRetry ? ' (Retry)' : ''}`,
        timestamp: new Date(),
      }
      const commandHistory = [newCommand, ...prevState.commandHistory];
      return { commandHistory };
    });
  }

  incrementFailCount = () => {
    this.setState((prevState) => ({
      failCount: prevState.failCount + 1,
    }));
  }

  startLoading = () => this.setState(prevState => ({ loadingStack: prevState.loadingStack + 1 }))
  clearLoading = () => this.setState(prevState => ({ loadingStack: prevState.loadingStack - 1 }))
  
  clearAlertMessage = () => this.setState({ alertMessage: '' })

  render() {
    const {
      loadingStack,
      robotState,
      failCount,
      alertMessage,
      commandHistory,
    } = this.state;

    const isLoading = (loadingStack > 0);

    return (
      <LayoutContainer>
        <AlertMessage {...{ failCount, alertMessage }} />
        <MainControl>
          <LoadingSpinner {...{ isLoading }} />
          <RobotStatus {...{ robotState }} />
          <ButtonsDisplay
            {...{ isLoading, robotState }}
            handlePostRobotActionApiCall={this.handlePostRobotActionApiCall}
          />
        </MainControl>
        <CommandHistory {...{ commandHistory }} />
      </LayoutContainer>
    );
  }
}

export default App;
