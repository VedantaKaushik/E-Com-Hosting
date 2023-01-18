/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Google from "../assets/Google.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "./Loading";

const Register = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // changint the background color
    document.querySelector("body").style.backgroundColor = "#F5F5F5";

    // Changing the Title
    document.querySelector("title").textContent = "ECom | Register";
  });

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user]);

  // Storing State
  const reState = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const [loading, setLoading] = useState(false);

  const SignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    //
    const name = Name.trim().replace(/  +/g, " ");
    const email = Email.trim().toLowerCase().replace(/ /g, "");

    const valEmail = Email.includes("@");
    if (!valEmail) {
      return toast("Enter A Valid Email", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

    const PassRegx = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );

    const ValPass = PassRegx.test(password);
    if (!ValPass) {
      return toast("Chose A Strong Password", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

    const data = { name, email, password };

    reState();

    const res = await axios.post(
      "https://voltssr.onrender.com/api/user/create",
      data,
      {
        "Content-Type": "application/json",
      }
    );

    if (res.data.sucess === false) {
      setLoading(false);
      return toast(res.data.message, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

    if (res.data.sucess === true) {
      setLoading(false);
      navigate("/login");
      return;
    }
  };

  return (
    <>
      {loading ? <Loading /> : <></>}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />

      <AlignDiv>
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <p
            style={{
              fontSize: "5rem",
              color: "white",
              fontWeight: 800,
              justifySelf: "start",
              margin: "1rem 0",
              color: "#15161d",
            }}
          >
            ECom
          </p>
        </Link>
        <Container>
          <LoginDiv>
            <Heading>
              <p>SIGNUP</p>
            </Heading>

            <InputDiv>
              <p>Name</p>
              <input
                type="text"
                id="name"
                value={Name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </InputDiv>

            <InputDiv>
              <p>Email</p>
              <input
                type="text"
                value={Email}
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </InputDiv>

            <PasswordDiv>
              <p>Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value.toString());
                }}
              />
            </PasswordDiv>

            <Button>
              <button onClick={SignUp} id="signUp">
                SIGN UP
              </button>
            </Button>

            <Dec>
              <p>OR Sign In With</p>
            </Dec>
            <Icons>
              <img src={Google} alt="." />
            </Icons>
            <Registerr>
              <Link to="/login">Sign In Insted</Link>
            </Registerr>
          </LoginDiv>
        </Container>
      </AlignDiv>
    </>
  );
};

//
const AlignDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Container = styled.div`
  border: none;
  height: 50rem;
  width: 35rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background-color: white;

  p {
    margin: 0;
  }
`;

const LoginDiv = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Heading = styled.div`
  font-size: 2rem;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 6rem;
  font-size: 1.5rem;
  justify-content: space-around;

  input {
    height: 3rem;
    width: 95%;
    border: 0.01rem solid;
    outline: none;
    padding: 0 0 0 0.5rem;
    border-radius: 0.5rem;
    font-size: 2rem;
  }
`;

const PasswordDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 8rem;
  font-size: 1.5rem;
  justify-content: space-around;

  input {
    height: 3rem;
    width: 95%;
    border: 0.01rem solid;
    outline: none;
    padding: 0 0 0 0.5rem;
    border-radius: 0.5rem;
    font-size: 2rem;
  }

  a {
    font-size: 1.2rem;
    align-self: flex-end;
    margin: 0 1.5rem 0 0;
    color: #808080;
    text-decoration: none;
  }
`;

const Button = styled.div`
  button {
    width: 95%;
    height: 4rem;
    padding: 0;
    border: none;
    border-radius: 2rem;
    font-size: 2rem;
    font-weight: 600;
    color: white;
    background-color: #d10024;
    margin: 0 0 0 0.3rem;
    cursor: pointer;
  }
`;

const Dec = styled.div`
  text-align: center;
  color: #808080;
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 5rem;
    border-radius: 10rem;
    cursor: pointer;
  }
`;

const Registerr = styled.div`
  text-align: center;
  a {
    text-decoration: none;
    color: black;
  }
`;
export default Register;
