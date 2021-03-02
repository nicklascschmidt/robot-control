import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  background-color: lightgrey;
  min-height: 100vh;
  min-width: 100vw;
`;

const ContentContainer = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);

  height: 78vh;
  min-width: 80vw;

  @media (min-width: 320px) {
    /* smartphones, iPhone, portrait 480x320 phones */
  }
  @media (min-width: 481px) {
    /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */
    min-width: 60vw;
  }
  @media (min-width: 641px) {
    /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
    min-width: 50vw;
  }
  @media (min-width: 961px) {
    /* tablet, landscape iPad, lo-res laptops ands desktops */
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

const LayoutContainer = ({ children }) => {
  return (
    <Background>
      <ContentContainer>
        { children }
      </ContentContainer>
    </Background>
  );
}

export default LayoutContainer;
