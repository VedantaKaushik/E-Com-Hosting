import React from "react";
import styled from "styled-components";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const NewsLetter = () => {
  return (
    <>
      <Container>
        <Div>
          <MailOutlineIcon id="mail" />
          <Heading>Get Latest Offers</Heading>
          <Letter>
            <input type="text" placeholder="Enter Your Email" />
            <button>Subscribe</button>
          </Letter>
        </Div>
      </Container>
    </>
  );
};

// Styles
const Container = styled.div`
  width: 100%;
  height: 30rem;
  border-top: 0.2rem solid #e4e7ed;
`;

const Div = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  #mail {
    position: absolute;
    font-size: 20rem;
    align-self: flex-start;
    margin: 0 0 0 15rem;
    transform: rotate(20deg);
    z-index: -2;
    color: #e4e7ed;
  }
`;

const Heading = styled.p`
  font-size: 2.5rem;
  font-weight: 500;
  margin: 1rem 0;
`;

const Letter = styled.div`
  border: 0.1rem solid #e4e7ed;
  width: 50%;
  height: 4rem;
  border-radius: 5rem;
  overflow: hidden;
  display: flex;

  input {
    width: 70%;
    height: 100%;
    border: none;
    padding: 0 1rem 0 1rem;
    outline: none;
    font-size: 1.5rem;
  }

  button {
    width: 30%;
    height: 100%;
    border: none;
    padding: 0;
    cursor: pointer;
    background-color: #d10024;
    font-weight: 700;
    color: white;
  }

  @media (max-width: 768px) {
    width: 95%;
  }
`;
export default NewsLetter;
