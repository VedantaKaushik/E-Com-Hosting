import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PreNav from "./PreNav";
import Header from "./Header";
import LogoutIcon from "@mui/icons-material/Logout";
import PreFooter from "./PreFooter";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Slices/AuthSlice";
import { Country } from "country-state-city";
import { ToastContainer } from "react-toastify";

const Account = () => {
  useEffect(() => {
    document.querySelector("title").textContent = "ECom | Account";
    document.querySelector("body").style.backgroundColor = "#FFF";

    if (document.querySelector("title").textContent === "ECom | Account") {
      document.getElementById("My-Account").style.color = "#d10024";
    } else {
      document.getElementById("My-Account").style.color = "initial";
    }
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.auth.user);

  const SaveBtn = () => {};

  //
  const LogoutFunc = () => {
    dispatch(logout());
    return navigate("/");
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

      <PreNav />
      <Header />
      {User === null ? (
        <></>
      ) : (
        <Container>
          <Div>
            <InfoCard>
              <p>
                Hello
                {User === null ? <></> : " " + User.name.split(" ")[0]}
              </p>

              <CardDiv>
                <Cards>
                  <span>Personal Details</span>
                </Cards>
                <Cards>
                  <span>Orders</span>
                </Cards>
              </CardDiv>
              <Logout onClick={LogoutFunc}>
                <Link to="#" id="Logout">
                  <LogoutIcon />
                  Logout
                </Link>
              </Logout>
            </InfoCard>

            <DetailCard>
              {/* Personal Info */}
              <PInfo>
                <Card>
                  <label>Name</label>
                  <input
                    type="text"
                    className="name"
                    disabled={true}
                    value={User.name}
                  />
                  <button>edit</button>
                </Card>
                <Card>
                  <label>Email</label>
                  <input
                    type="email"
                    className="email"
                    disabled={true}
                    value={User.email}
                  />
                  <button>edit</button>
                </Card>
              </PInfo>

              {/* Address Info */}
              <AdressInfo>
                <Headerr>
                  <p>Your Address</p>
                  <button>edit</button>
                </Headerr>
                <input
                  type="text"
                  placeholder="Address"
                  className="AdressLine"
                  disabled={true}
                />

                <input
                  type="text"
                  placeholder="City"
                  className="City"
                  disabled={true}
                />
                <input
                  type="text"
                  placeholder="State"
                  className="State"
                  disabled={true}
                />
                <input
                  type="number"
                  placeholder="Zip-Code"
                  className="Zip"
                  disabled={true}
                />
                <input
                  type="number"
                  placeholder="Phone Number"
                  className="Phone"
                  disabled={true}
                />
                <Headerr>
                  <select className="Country" disabled={true}>
                    <option>Country</option>
                    {Country.getAllCountries().map((Country) => (
                      <option key={Country.name}>{Country.name}</option>
                    ))}
                  </select>
                  <button id="save-info" onClick={SaveBtn}>
                    Save
                  </button>
                </Headerr>
              </AdressInfo>
            </DetailCard>
          </Div>
        </Container>

        // Order Card
      )}

      <PreFooter />
      <Footer />
    </>
  );
};

// Styles
const Container = styled.div`
  width: 100%;
  height: 65rem;
`;

const Div = styled.div`
  width: 80%;
  margin: auto;
  height: 60rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 2rem 0 0 0;
`;

const InfoCard = styled.div`
  height: 35rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.6rem;
  gap: 2rem;
  padding: 3rem;
  margin: 4rem 0 0 1rem;
  border: 0.1rem solid #e4e7ed;
  border-radius: 2rem;

  p {
    margin: 0;
    font-size: 2.6rem;
    font-weight: 500;
  }
`;

const CardDiv = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 4rem 0 0 0;
`;

const Cards = styled.div`
  font-weight: 400;
  border: 0.1rem solid #e4e7ed;
  width: 100%;
  border-radius: 1rem;
  text-align: center;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logout = styled.div`
  width: 100%;
  display: flex;
  width: 100%;
  justify-content: center;
  font-weight: 400;

  a {
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    gap: 0.5rem;
    font-size: 2rem;

    svg {
      font-size: 2rem;
    }
  }
`;

const DetailCard = styled.div`
  margin: 2rem 1rem;
  border: 0.1rem solid #e4e7ed;
  border-radius: 2rem;
  height: 55rem;
`;

// Adress Sec
const PInfo = styled.div`
  margin: auto;
  width: 90%;
  height: 14rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
`;

const Card = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  align-items: center;

  label {
    justify-self: center;
    font-size: 1.5rem;
  }

  input {
    width: 90%;
    height: 3rem;
    border: 0.1rem solid #e4e7ed;
    border-radius: 2rem;
    outline: none;
    padding: 0 1rem 0 1rem;
    justify-self: center;
  }

  button {
    border: none;
    width: 5rem;
    border-radius: 2rem;
    height: 3rem;
    justify-self: end;
    cursor: pointer;
  }
`;

const AdressInfo = styled.div`
  margin: auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 70%;
  gap: 2rem;

  input {
    width: 90%;
    height: 3rem;
    border: 0.1rem solid #e4e7ed;
    border-radius: 2rem;
    outline: none;
    padding: 0 1rem 0 1rem;
    justify-self: center;
  }

  select {
    width: 50%;
    height: 3rem;
    border: 0.1rem solid #e4e7ed;
    border-radius: 2rem;
    outline: none;
    padding: 0 1rem 0 1rem;
    justify-self: center;
  }

  #save-info {
    pointer-events: none;
    justify-self: flex-end;
    opacity: 0.7;
  }
`;

const Headerr = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 2rem;
    font-weight: 600;
    margin: 1rem 0;
  }

  button {
    border: none;
    width: 5rem;
    border-radius: 2rem;
    height: 3rem;
    justify-self: end;
    cursor: pointer;
  }
`;
export default Account;
