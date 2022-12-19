import React from "react";
import im from "../assets/404.jpg";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Container>
      <Div>
        <img src={im} alt="404" />
      </Div>
    </Container>
  );
};

// Style
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Div = styled.div`
  width: 50%;
  margin: auto;
  height: 75%;

  img {
    height: 100%;
    width: 100%;
  }

  @media (max-width: 768px) {
    height: 40%;
  }
`;

export default NotFound;
