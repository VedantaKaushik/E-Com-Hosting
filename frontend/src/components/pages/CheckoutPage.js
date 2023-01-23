import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loading from "../Loading";

import PreNav from "../PreNav";
import PreFooter from "../PreFooter";
import Footer from "../Footer";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { priceTotal, product } = useSelector((State) => State.cart);

  useEffect(() => {
    document.querySelector("body").style.backgroundColor = "#FFF";
    document.querySelector("title").textContent = `ECom | Checkout`;
  });

  //
  useEffect(() => {
    if (product.length === 0) {
      navigate("/");
    }
    return;
  });

  //
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, SetPhone] = useState("");
  const [AddressLine1, setAddressLine1] = useState("");
  const [AddressLine2, setAddressLine2] = useState("");
  const [City, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [State, setState] = useState("");
  const [Country, SetCountry] = useState("");

  //
  const ContinueToPay = async () => {
    setLoading(true);
    // validating the feilds
    const letter = new RegExp("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$");

    const name = Name.trim().replace(/  +/g, " ");
    if (name.length < 1 || !letter.test(name)) {
      setLoading(false);
      return toast("Enter A Valid Name", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

    const email = Email.trim().toLowerCase().replace(/ /g, "");
    const valEmail = email.includes("@");
    if (!valEmail) {
      setLoading(false);
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

    const phone = Phone.toString().trim().replace(/ /g, "");
    if (phone.length < 10 || letter.test(phone)) {
      setLoading(false);
      return toast("Enter A Valid Phone", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

    const addressLine1 = AddressLine1.trim().replace(/  +/g, " ");
    if (addressLine1.length < 1 || !letter.test(addressLine1)) {
      setLoading(false);
      return toast("Enter A Valid Address", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

    const addressLine2 = AddressLine2.trim().replace(/  +/g, " ");
    if (addressLine2.length < 1 || !letter.test(addressLine2)) {
      setLoading(false);
      return toast("Enter A Valid Address", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

    const city = City.trim().replace(/ /g, "");
    if (city.length < 1 || !letter.test(city)) {
      setLoading(false);
      return toast("Enter A Valid City", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

    const ZipCode = zipCode.trim().replace(/ /g, "");
    if (ZipCode.length < 1 || letter.test(ZipCode)) {
      setLoading(false);
      return toast("Enter A Valid ZipCode", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

    const state = State.trim().replace(/ /g, "");
    if (state.length < 1 || !letter.test(state)) {
      setLoading(false);
      return toast("Enter A Valid State", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

    const country = Country.trim().replace(/ /g, "");
    if (country.length < 1 || !letter.test(country)) {
      setLoading(false);
      return toast("Enter A Valid Country", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

    // posting The Datea
    const userInfo = {
      name,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      ZipCode,
      state,
      country,
    };

    const Product = product;

    const data = { userInfo, Product, priceTotal };

    const res = await axios.post(
      "https://voltssr.onrender.com/api/order/create",
      {
        data,
      }
    );

    // reseting the state
    setName("");
    setEmail("");
    SetPhone("");
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setZipCode("");
    setState("");
    SetCountry("");

    // Loading
    if (res.data.sucess === true) {
      setLoading(false);
      return toast(`${res.data.message} with id ${res.data._id}`, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

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
  };

  // Making Mobile Responsive
  const WriteAddress = () => {
    const MobileUserInfo = document.querySelector(".UserInfo-mobile");
    const MobileProductCard = document.querySelector(".Product-card-mobile");

    MobileProductCard.style.display = "none";
    MobileUserInfo.style.display = "flex";
  };

  return (
    <>
      <PreNav />
      {/*  */}
      <Container>
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

        {loading ? <Loading /> : <></>}
        <Heading>
          <D>
            <Link to="/">
              <p className="logo">ECom</p>
            </Link>
          </D>
        </Heading>
        <Line />
        <Div>
          <Content>
            <UserInfo className="UserInfo">
              <h3>SHIPING ADDRESS</h3>

              <input
                type="text"
                id="Name"
                placeholder="Name"
                className="Input"
                value={Name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="email"
                id="Email"
                placeholder="Email"
                className="Input"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="number"
                id="Phone"
                placeholder="Phone"
                className="Input"
                value={Phone}
                onChange={(e) => {
                  SetPhone(e.target.value);
                }}
              />
              <input
                type="text"
                id="AddressLine1"
                placeholder="Address Line 1"
                className="Input"
                value={AddressLine1}
                onChange={(e) => {
                  setAddressLine1(e.target.value);
                }}
              />
              <input
                type="text"
                id="AddressLine2"
                placeholder="Address Line 2"
                className="Input"
                value={AddressLine2}
                onChange={(e) => {
                  setAddressLine2(e.target.value);
                }}
              />
              <input
                type="text"
                id="City"
                placeholder="City"
                className="Input"
                value={City}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <input
                type="number"
                id="ZipCode"
                placeholder="ZipCode"
                className="Input"
                value={zipCode}
                onChange={(e) => {
                  setZipCode(e.target.value);
                }}
              />
              <input
                type="text"
                id="State"
                placeholder="State"
                className="Input"
                value={State}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <input
                type="text"
                id="Country"
                placeholder="Country"
                className="Input"
                value={Country}
                onChange={(e) => {
                  SetCountry(e.target.value);
                }}
              />
              <button onClick={ContinueToPay}>Continue To Payment</button>
            </UserInfo>
            <ProductContents className="Product-card">
              <Card>
                <h2>Your Order</h2>

                <Wrapper>
                  {product.map((product) => (
                    <UserItems key={product._id}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          width: "92%",
                        }}
                      >
                        <img
                          src={product.images[0].url}
                          alt="."
                          className="i"
                        />
                        <p className="Tit">{product.title}</p>
                      </div>
                      <p>X{product.cartQuantity}</p>
                    </UserItems>
                  ))}
                </Wrapper>

                <p className="Total">Total : ₹{priceTotal}</p>

                <button onClick={ContinueToPay}>Continue To Payment</button>
              </Card>
            </ProductContents>
          </Content>

          {/*  Mobile Checkout */}
          <MobileDiv>
            <ProductContents className="Product-card-mobile">
              <Card>
                <h2>Your Order</h2>

                <Wrapper>
                  {product.map((product) => (
                    <UserItems key={product._id}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          width: "92%",
                        }}
                      >
                        <img
                          src={product.images[0].url}
                          alt="."
                          className="i"
                        />
                        <p className="Tit">{product.title}</p>
                      </div>
                      <p>X{product.cartQuantity}</p>
                    </UserItems>
                  ))}
                </Wrapper>

                <p className="Total">Total : ₹{priceTotal}</p>

                <button onClick={WriteAddress}>Continue To Address</button>
              </Card>
            </ProductContents>

            <UserInfo className="UserInfo-mobile">
              <h3>SHIPING ADDRESS</h3>

              <input
                type="text"
                id="Name"
                placeholder="Name"
                className="Input"
                value={Name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="email"
                id="Email"
                placeholder="Email"
                className="Input"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="number"
                id="Phone"
                placeholder="Phone"
                className="Input"
                value={Phone}
                onChange={(e) => {
                  SetPhone(e.target.value);
                }}
              />
              <input
                type="text"
                id="AddressLine1"
                placeholder="Address Line 1"
                className="Input"
                value={AddressLine1}
                onChange={(e) => {
                  setAddressLine1(e.target.value);
                }}
              />
              <input
                type="text"
                id="AddressLine2"
                placeholder="Address Line 2"
                className="Input"
                value={AddressLine2}
                onChange={(e) => {
                  setAddressLine2(e.target.value);
                }}
              />
              <input
                type="text"
                id="City"
                placeholder="City"
                className="Input"
                value={City}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <input
                type="number"
                id="ZipCode"
                placeholder="ZipCode"
                className="Input"
                value={zipCode}
                onChange={(e) => {
                  setZipCode(e.target.value);
                }}
              />
              <input
                type="text"
                id="State"
                placeholder="State"
                className="Input"
                value={State}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <input
                type="text"
                id="Country"
                placeholder="Country"
                className="Input"
                value={Country}
                onChange={(e) => {
                  SetCountry(e.target.value);
                }}
              />
              <button onClick={ContinueToPay}>Continue To Payment</button>
            </UserInfo>
          </MobileDiv>
          {/*  */}
        </Div>
      </Container>

      {/*  */}
      <PreFooter />
      <Footer />
    </>
  );
};

// Style
const Container = styled.div`
  height: fit-content;
`;

const Div = styled.div`
  width: 80%;
  margin: auto;
  height: 100%;
`;

const Heading = styled.div`
  height: 10rem;
  background-color: #15161d;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: white;
  }

  .logo {
    font-size: 5rem;
    color: white;
    font-weight: 800;
    justify-self: start;
  }
`;

const Line = styled.span`
  display: block;
  height: 0.3rem;
  background-color: #d10024;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const D = styled.div`
  width: 80%;
  margin: auto;
`;

const Content = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    .Product-card,
    .UserInfo {
      display: none;
    }
  }
`;

const MobileDiv = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;

    .UserInfo-mobile {
      display: none;
      width: 100%;
    }

    .Product-card-mobile {
      width: 100%;
      margin: 2rem 0;
      display: block;
    }
  }
`;

const UserInfo = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2rem 0;

  h3 {
    font-size: 2.4rem;
    font-weight: 600;
    text-transform: uppercase;
    margin: 2rem 0;
  }

  .Input {
    height: 4rem;
    border: 0.1rem solid #e4e7ed;
    background-color: #fff;
    width: 90%;
    margin: 1rem 0;
    padding: 0 0 0 1rem;
    outline: none;
  }

  button {
    margin: 2rem 6rem 2rem 0;
    padding: 1rem;
    border: none;
    width: 15rem;
    border-radius: 1rem;
    color: white;
    text-transform: uppercase;
    font-weight: 600;
    background-color: #d10024;
    cursor: pointer;
    align-self: flex-end;
  }
`;
const ProductContents = styled.div`
  width: 40%;

  /* @media (max-width: 768px) {
    width: 100%;
    margin: 2rem 0;
    display: block;
  } */
`;

const Card = styled.div`
  width: 100%;
  height: 50rem;
  border: 0.1rem solid #e4e7ed;
  text-align: center;

  h2 {
    text-transform: uppercase;
    margin: 2rem 0;
  }

  .Total {
    font-size: 2rem;
    font-weight: 600;
    margin: 0 0 0 4rem;
    text-align: initial;
  }

  button {
    margin: 2rem 0;
    padding: 1rem;
    border: none;
    width: 25rem;
    border-radius: 1rem;
    color: white;
    text-transform: uppercase;
    font-weight: 600;
    background-color: #d10024;
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  width: 90%;
  margin: auto;
  height: 65%;
  overflow: scroll;
`;

const UserItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .i {
    width: 8rem;
    height: 8rem;
  }

  p {
    font-size: 2rem;
  }

  .Tit {
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

export default CheckoutPage;
