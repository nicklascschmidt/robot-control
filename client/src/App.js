import { Component } from 'react';
import LayoutContainer from './components/LayoutContainer/LayoutContainer.jsx';
import MainControl from './components/MainControl/MainControl.jsx';
import RobotState from './components/RobotStatus/RobotStatus.jsx';
import ButtonsDisplay from './components/ButtonsDisplay/ButtonsDisplay.jsx';
import CommandHistory from './components/CommandHistory/CommandHistory.jsx';
import AlertMessage from './components/AlertMessage/AlertMessage.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <LayoutContainer>
        <AlertMessage />
        <MainControl>
          <RobotState />
          <ButtonsDisplay />
        </MainControl>
        <CommandHistory className='command-history' />
      </LayoutContainer>
    );
  }
}

export default App;
