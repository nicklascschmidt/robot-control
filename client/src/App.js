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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStack: 0,
      alertMessage: '',
      robotState: '',
      failedCount: 0,
      commandHistory: [],
    };
  }

  componentDidMount() {
    this.fetchRobotStateAndUpdateLocalState();
  }

  fetchRobotStateAndUpdateLocalState = async () => {
    console.log('fetching robot state');
    this.startLoading();

    await getRobotStateFromApi()
      .then(({ data: robotState }) => {
        this.setState({ robotState });
        if (robotState === RSC.FAILED) this.incrementFailCount();
      })
      .catch((err) => console.error(err))
      .finally(this.clearLoading);
  };

  handlePostRobotActionApiCall = async (action, isRetry, retryCount = 0) => {
    console.log('posting robot action', action);
    this.startLoading();

    // delay the API call if retrying after hitting 503 error
    if (isRetry) await new Promise(resolve => setTimeout(resolve, 1500))

    this.setState(prevState => {
      const newCommand = {
        action: `${action}${isRetry ? ' (Retry)' : ''}`,
        timestamp: new Date(),
      }
      const commandHistory = [newCommand, ...prevState.commandHistory];
      return { commandHistory };
    })

    await postRobotActionToApi(action)
      .then((resp) => {
        const robotState = resp.data.state;
        this.setState({ robotState });

        if (robotState === RSC.FAILED) this.incrementFailCount();

        this.clearAlertMessage();
      })
      .catch((err) => {
        console.error(err);

        // when POST call fails, robot's state might have changed to FAILED unexpectedly
        // need to re-fetch robot state to check if it failed and incrementFailCount() if so
        this.fetchRobotStateAndUpdateLocalState();
        
        if (err.response.status !== 503) {
          this.setState({
            alertMessage: getErrorMessageFromErrorHtmlData(err.response.data),
          });
        }

        // on 503 err, retry the POST call, but limit how many times the call is retried to avoid continuous loop on repeated 503s
        if (err.response.status === 503) {
          if (retryCount < 3) {
            this.setState({ alertMessage: AC.HTTP_503_ERROR_RETRY_MESSAGE });
            this.handlePostRobotActionApiCall(action, true, retryCount + 1)
          } else {
            this.setState({ alertMessage: AC.HTTP_503_ERROR });
          }
        }
      })
      .finally(this.clearLoading);
  };

  incrementFailCount = () => {
    this.setState((prevState) => ({
      failedCount: prevState.failedCount + 1,
    }));
  };

  startLoading = () => this.setState(prevState => ({ loadingStack: prevState.loadingStack + 1 }))
  clearLoading = () => this.setState(prevState => ({ loadingStack: prevState.loadingStack - 1 }))
  
  clearAlertMessage = () => this.setState({ alertMessage: '' })

  render() {
    const {
      loadingStack,
      robotState,
      failedCount,
      alertMessage,
      commandHistory,
    } = this.state;

    const isLoading = (loadingStack > 0);

    return (
      <LayoutContainer>
        <AlertMessage {...{ failedCount, alertMessage }} />
        <MainControl>
          <LoadingSpinner {...{ isLoading }} />
          <RobotStatus robotState={robotState} />
          <ButtonsDisplay
            {...{ isLoading, robotState }}
            handlePostRobotActionApiCall={this.handlePostRobotActionApiCall}
          />
        </MainControl>
        <CommandHistory commandHistory={commandHistory} />
      </LayoutContainer>
    );
  }
}

export default App;
