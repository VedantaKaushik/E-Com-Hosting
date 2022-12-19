import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <>
      <Container>
        <Load></Load>
      </Container>
    </>
  );
};

// style
const Container = styled.div`
  position: fixed;
  background-color: transparent;
  height: 100%;
  width: 100%;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const Load = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  border: 0.8rem solid;
  border-color: #ef233c transparent #ef233c transparent;
  border-radius: 50%;
  animation: spin-anim 1.2s linear infinite;

  @keyframes spin-anim {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Loading;
