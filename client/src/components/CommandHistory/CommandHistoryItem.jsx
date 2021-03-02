import React from 'react';
import styled from 'styled-components';

const Action = styled.div`
  text-transform: capitalize;
`;

export const EmptyItemFiller = () => (
  <tr>
    <td>None</td>
    <td>None</td>
  </tr>
);

const CommandHistoryItem = ({ action, timestamp }) => {
  return (
    <tr>
      <td>
        <time dateTime={timestamp}>{timestamp.toLocaleString()}</time>
      </td>
      <td>
        <Action>{action}</Action>
      </td>
    </tr>
  );
}

export default CommandHistoryItem;
