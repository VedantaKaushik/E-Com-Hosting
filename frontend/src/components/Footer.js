import React from "react";
import styled from "styled-components";
import Amex from "../assets/Amex.svg";
import Visa from "../assets/Visa.svg";
import Paypal from "../assets/Paypal.svg";
import Mastercard from "../assets/Mastercard.svg";
import Dinar from "../assets/Diners Club.svg";
import Discover from "../assets/Discover.svg";
import ApplePay from "../assets/ApplePay.svg";

const Footer = () => {
  return (
    <Container>
      <Div>
        <Payments>
          <img src={Amex} alt="." />
          <img src={ApplePay} alt="." />
          <img src={Dinar} alt="." />
          <img src={Discover} alt="." />
          <img src={Mastercard} alt="." />
          <img src={Paypal} alt="." />
          <img src={Visa} alt="." />
        </Payments>
        <Desc>
          <p>Copyright ©2022 All rights reserved | ECom</p>
        </Desc>
      </Div>
    </Container>
  );
};

// Styles
const Container = styled.div`
  width: 100%;
  background-color: #1e1f29;
  height: 14rem;
`;

const Div = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Payments = styled.div`
  opacity: 0.5;

  img {
    width: 4rem;
    padding: 0 1rem 0 1rem;
  }

  @media (max-width: 768px) {
    img {
      width: 3rem;
    }
  }
`;

const Desc = styled.div`
  p {
    margin: 2rem 0 0 0;
    font-size: 1.2rem;
    color: #b9babc;
  }

  @media (max-width: 768px) {
    p {
      font-size: 1rem;
    }
  }
`;
export default Footer;
