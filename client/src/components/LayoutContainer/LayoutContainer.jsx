import React from 'react';
import styled from 'styled-components';


const ContentContainer = styled.div`
  margin: 1em;
  width: 90vw;

  @media (min-width: 320px) {
    /* smartphones, iPhone, portrait 480x320 phones */
  }
  @media (min-width: 481px) {
    /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */
    width: 80vw;
  }
  @media (min-width: 641px) {
    /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
    width: 70vw;
  }
  @media (min-width: 961px) {
    /* tablet, landscape iPad, lo-res laptops ands desktops */
    width: 60vw;
  }
  @media (min-width: 1025px) {
    /* big landscape tablets, laptops, and desktops */
  }
  @media (min-width: 1281px) {
    /* hi-res laptops and desktops */
  }

  display: flex;
  flex-flow: column nowrap;
  gap: 1em;

  .command-history {
    flex: 1 1 auto;
  }
`;

const StyledHeader = styled.header`
  color: white;
  font-weight: 600;
  font-size: large;
`;

const LayoutContainer = ({ children }) => {
  return (
    <ContentContainer>
      <StyledHeader>OSARO Robot Control</StyledHeader>
      { children }
    </ContentContainer>
  );
}

export default LayoutContainer;
