import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Google from "../assets/Google.png";
import { userLogin } from "../redux/Slices/AuthSlice";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token, error } = useSelector((state) => state.auth);

  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // changint the background color
    document.querySelector("body").style.backgroundColor = "#F5F5F5";

    // Changing the Title
    document.querySelector("title").textContent = "E-Com | Login";
  });

  // Checking if user Exists
  const User = sessionStorage.getItem("user");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if ((User && userId) || (user !== null && token !== null)) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User, userId]);

  // Storing State
  const reState = () => {
    setEmail("");
    setPassword("");
  };

  // Login Func
  const LogIn = () => {
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

    //Reseting States
    reState();

    dispatch(userLogin({ email, password }));

    if (error) {
      return toast.error(error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
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
        <Container>
          <LoginDiv>
            <Heading>
              <p>LOGIN</p>
            </Heading>

            <EmailDiv>
              <p>Email</p>
              <input
                type="text"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </EmailDiv>
            <PasswordDiv>
              <p>Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value.toString());
                }}
              />
              <Link to="#">Forgot Password?</Link>
            </PasswordDiv>

            <Button>
              <button onClick={LogIn}>LOG IN</button>
            </Button>

            <Dec>
              <p>OR Sign In With</p>
            </Dec>
            <Icons>
              <img src={Google} alt="." />
            </Icons>
            <Register>
              <Link to="/register">Create An Account</Link>
            </Register>
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
`;

const Container = styled.div`
  border: none;
  height: 45rem;
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

const EmailDiv = styled.div`
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
    font-weight: 100;
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
    font-weight: 100;
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

const Register = styled.div`
  text-align: center;
  a {
    text-decoration: none;
    color: black;
  }
`;

const Icons = styled.div`
  text-align: center;

  img {
    width: 5rem;
    border-radius: 10rem;
    cursor: pointer;
  }
`;

export default Login;
