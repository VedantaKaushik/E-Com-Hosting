import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Earbuds from "../assets/earbuds.jpg";
import Charger from "../assets/Charger.png";
import HeadPhone from "../assets/headphones.png";

const Catagories = () => {
  // Changing the Title
  const c = "ear";
  useEffect(() => {
    document.querySelector("title").textContent = `Volts | ${c}`;
  });

  return (
    <>
      <Container>
        <Div>
          <CatagoriBoxes>
            <Heading>
              <p>
                Earbud
                <br /> Collection <br />
                <Link to={`/products/catagorie`}>Shop Now</Link>
              </p>
            </Heading>
            <img src={Earbuds} alt="." />
          </CatagoriBoxes>

          <CatagoriBoxes>
            <Heading>
              <p>
                Charger
                <br /> Collection <br />
                <Link to="#">Shop Now</Link>
              </p>
            </Heading>
            <img src={Charger} alt="." />
          </CatagoriBoxes>

          <CatagoriBoxes>
            <Heading>
              <p>
                Headphone
                <br /> Collection <br />
                <Link to="#">Shop Now</Link>
              </p>
            </Heading>
            <img src={HeadPhone} alt="." />
          </CatagoriBoxes>
        </Div>
      </Container>
    </>
  );
};

// Style
const Container = styled.div`
  height: 25rem;
  margin: 4rem 0;
  width: 100%;

  p {
    margin: 0;
    padding: 0;
  }

  @media (max-width: 768px) {
    height: fit-content;
    margin: 5rem 0 0 0;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 100%;
  width: 80%;
  margin: auto;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 95%;
    flex-direction: column;
  }
`;

const CatagoriBoxes = styled.div`
  width: 35rem;
  height: 25rem;
  background-color: #e4e7ed;
  text-align: center;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    width: 80%;
    margin: auto;
    height: 100%;
    transition: all 0.2s;
  }

  img:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 90%;
    height: 30rem;
  }

  @media (max-width: 752px) {
    width: 70%;
    height: 35rem;
  }
`;

const Heading = styled.span`
  width: 20rem;
  height: 25rem;
  position: absolute;
  background-color: #d10024;
  opacity: 90%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    color: white;
    font-size: 3rem;
    opacity: initial;
    font-weight: 600;
    text-align: left;
    margin: 0 1rem 0 1rem;
  }

  a {
    color: white;
    font-size: 1.5rem;
    text-decoration: none;
    margin: 1rem 0;
  }

  @media (max-width: 768px) {
    height: 30rem;
    width: 25rem;
  }

  @media (max-width: 752px) {
    width: 20rem;
    height: 35rem;
  }
`;

export default Catagories;
