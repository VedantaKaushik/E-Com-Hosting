import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetState } from "../redux/Slices/FeatureSlice";

const PreFooter = () => {
  const id = sessionStorage.getItem("userId");
  const dispatch = useDispatch();

  return (
    <div>
      <Line />
      <Conatiner>
        <Div>
          <Info>
            <p className="Heading">About Us</p>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              accusantium consequatur ex possimus perferendis alias?
            </p>
          </Info>

          <Info>
            <p className="Heading">Information</p>

            <Link
              to="#"
              className="links"
              onClick={() => {
                dispatch(resetState());
              }}
            >
              About Us
            </Link>
            <Link
              to="#"
              className="links"
              onClick={() => {
                dispatch(resetState());
              }}
            >
              Shipping Policy
            </Link>
            <Link
              to="#"
              className="links"
              onClick={() => {
                dispatch(resetState());
              }}
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="links"
              onClick={() => {
                dispatch(resetState());
              }}
            >
              Orders and Returns
            </Link>
          </Info>

          <Info>
            <p className="Heading">Services</p>

            <Link
              to={`/account/${id}`}
              className="links"
              onClick={() => {
                dispatch(resetState());
              }}
            >
              My Account
            </Link>
            <Link
              to="/order/track"
              className="links"
              onClick={() => {
                dispatch(resetState());
              }}
            >
              Track My Order
            </Link>
            <Link
              to="#"
              className="links"
              onClick={() => {
                dispatch(resetState());
              }}
            >
              Help
            </Link>
          </Info>
        </Div>
      </Conatiner>
    </div>
  );
};

// styled
const Line = styled.span`
  display: block;
  height: 0.3rem;
  background-color: #d10024;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const Conatiner = styled.div`
  width: 100%;
  background-color: #15161d;
  height: 35rem;
`;

const Div = styled.div`
  width: 80%;
  color: white;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Info = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 25rem;

  .Heading {
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 3rem 0;
  }

  .desc {
    margin: 1rem 0;
    font-size: 1.4rem;
    color: #b9babc;
    font-weight: 500;
  }

  .links {
    font-size: 1.4rem;
    margin: 1rem 0;
    text-decoration: none;
    color: #b9babc;
    font-weight: 500;
    transition: all 0.3s;
  }

  a:hover {
    color: #d10024;
  }

  @media (max-width: 768px) {
    .Heading {
      font-size: 1.6rem;
    }

    .desc {
      font-size: 1.2rem;
    }

    .links {
      font-size: 1.2rem;
    }
  }
`;

export default PreFooter;
