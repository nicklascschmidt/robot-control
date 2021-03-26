import { Component } from 'react';
import styled from 'styled-components';
import CommandHistoryItem, { EmptyItemFiller } from './CommandHistoryItem.jsx';

const Container = styled.div``;

const StyledTable = styled.table`
  width: 100%;
  text-align: left;
  background-color: white;
  border-spacing: 0;
  border-radius: .5em;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.2);
  overflow: hidden;

  thead {
    background-color: var(--color-brand-blue);
  }
  th, td {
    padding: 0.3em 0.5em;
  }
  th {
    padding: 0.8em 0.5em;
  }
  tbody {
    display: block;
    height: 16em;
    overflow: auto;
  }
  thead, tbody tr, tfoot {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
`;

class CommandHistory extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.commandHistory.length !== this.props.commandHistory.length) return true;
    return false;
  }

  render() {
    const { commandHistory } = this.props;
    return (
      <Container className='command-history'>
        <StyledTable>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {commandHistory.length === 0 
              ? <EmptyItemFiller />
              : commandHistory.map((command, idx) => (
                <CommandHistoryItem key={`${command.timestamp}-${idx}`} {...command} />
              ))}
          </tbody>
        </StyledTable>
      </Container>
    );
  }
}

export default CommandHistory;
