import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
// import EuroIcon from "@mui/icons-material/Euro";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { resetState } from "../redux/Slices/FeatureSlice";
import { useDispatch, useSelector } from "react-redux";

const PreNav = () => {
  const { user_id } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <DetailDiv>
          <Div1>
            {/* <Link to="#">
              <CallDiv>
              <CallIcon />
              <p>+91 97063-56546</p>
              </CallDiv>
            </Link> */}
            <Link to="#">
              <EmailDiv>
                <EmailIcon />
                <p>support@ecom.com</p>
              </EmailDiv>
            </Link>
          </Div1>
          <Div2>
            <CurrencyDiv>
              {/* <EuroIcon /> */}
              <CurrencyRupeeIcon />
              <p>INR</p>
            </CurrencyDiv>
            <Link
              to={`/account/${user_id}`}
              id="My-Account"
              onClick={() => {
                dispatch(resetState());
              }}
            >
              <AccountDiv>
                <PersonOutlineIcon />
                <p>My Account</p>
              </AccountDiv>
            </Link>
          </Div2>
        </DetailDiv>
      </Container>
    </>
  );
};

// Styles
const Container = styled.div`
  height: 4rem;
  width: 100%;
  background-color: #1e1f29;
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: white;

  p {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: white;
  }

  svg {
    color: #d10024;
    font-size: 1.5rem;
  }

  a:hover,
  p:hover {
    cursor: pointer;
    color: #d10024;
  }

  @media (max-width: 768px) {
    height: 8rem;
  }
`;

const DetailDiv = styled.div`
  height: 100%;
  width: 80%;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  align-items: center;

  @media (max-width: 768px) {
    width: 95%;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    align-items: flex-start;
  }
`;

const Div1 = styled.div`
  display: flex;
  width: 30rem;
  gap: 4rem;
`;

const CallDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
const EmailDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Div2 = styled.div`
  display: flex;
  width: 25rem;
  gap: 4rem;
`;

const CurrencyDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
const AccountDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export default PreNav;
