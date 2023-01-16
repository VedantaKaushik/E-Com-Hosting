import React, { useEffect } from "react";
import styled from "styled-components";
import PreNav from "../components/PreNav";
import Navbar from "./Header";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "../components/Footer";
import PreFooter from "../components/PreFooter";
import Amex from "../assets/Amex.svg";
import Visa from "../assets/Visa.svg";
import Paypal from "../assets/Paypal.svg";
import Mastercard from "../assets/Mastercard.svg";
import Dinar from "../assets/Diners Club.svg";
import Discover from "../assets/Discover.svg";
import ApplePay from "../assets/ApplePay.svg";
import { useSelector, useDispatch } from "react-redux";
import { incQuantity, decQuantity, getTotal } from "../redux/Slices/CartSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { product, priceTotal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector("title").textContent = "E-Com | Cart";
    dispatch(getTotal());
  });

  // maping product
  const MapedProduct = (
    <>
      {product &&
        product.map((product) => (
          <ProductCards key={product._id}>
            <Link to={`/product/${product._id}`}>
              <ProductTitle>
                <img src={product.images[0].url} alt="." />
                <p>{product.title}</p>
              </ProductTitle>
            </Link>
            <Quantiy>
              <RemoveIcon
                onClick={() => {
                  dispatch(decQuantity(product));
                }}
                className="decBtn"
              />
              <input type="text" disabled={true} value={product.cartQuantity} />
              <AddIcon
                onClick={() => {
                  dispatch(incQuantity(product));
                }}
                className="incBtn"
              />
            </Quantiy>
            <Price>
              €{product.price}
              <CloseIcon />
            </Price>
          </ProductCards>
        ))}
    </>
  );
  return (
    <>
      <PreNav />
      <Navbar />

      {product.length < 1 ? (
        <>
          <EmptyCart>Your Cart is Empty</EmptyCart>
        </>
      ) : (
        <>
          <Container>
            <Div>
              <OverFlow>{MapedProduct}</OverFlow>

              <Info>
                <Cont>
                  <p>Total</p>
                  <SubTotal>
                    <p>Sub-total</p>
                    <p>€{priceTotal}</p>
                  </SubTotal>
                  <Shipping>
                    <p>Shipping</p>
                    <p>free</p>
                  </Shipping>
                  <button
                    onClick={() => {
                      navigate("/checkout");
                    }}
                  >
                    Checkout
                  </button>
                  <PreInfo>
                    <p>We Accept</p>
                    <Payments>
                      <img src={Amex} alt="." />
                      <img src={ApplePay} alt="." />
                      <img src={Dinar} alt="." />
                      <img src={Discover} alt="." />
                      <img src={Mastercard} alt="." />
                      <img src={Paypal} alt="." />
                      <img src={Visa} alt="." />
                    </Payments>
                  </PreInfo>
                </Cont>
              </Info>
            </Div>
          </Container>
        </>
      )}

      <PreFooter />
      <Footer />
    </>
  );
};

// Styles
const EmptyCart = styled.div`
  width: 80%;
  height: 45rem;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
`;

const Container = styled.div`
  width: 100%;
  margin: 2.5rem 0 0 0;

  p {
    margin: 0;
  }

  svg {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    height: 80rem;
  }
`;

const Div = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 50rem;
  display: grid;
  grid-template-columns: 2fr 1fr;

  @media (max-width: 768px) {
    grid-template-rows: 2fr 1fr;
    grid-template-columns: none;
    height: 100%;
    width: 95%;
  }
`;

const ProductCards = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  justify-content: center;
  width: 98%;
  margin: 2rem auto;
  overflow: hidden;
  border-radius: 2rem;
  height: 15rem;
  border: 0.1rem solid #e4e7ed;

  a {
    margin: 0;
    padding: 0;
    width: 100%;
    text-decoration: none;
    color: black;
  }
`;

const OverFlow = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  width: 95%;

  @media (max-width: 768px) {
    height: 95%;
  }
`;

const ProductTitle = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 1rem;
  font-size: 1.5rem;
  text-align: center;
  width: 100%;

  img {
    margin: 0 1rem;
    width: 10rem;
    height: 10rem;
  }
`;

const Quantiy = styled.div`
  display: flex;
  align-items: center;
  border: 0.1rem solid #e4e7ed;
  border-radius: 1rem;
  height: 4rem;
  width: 8rem;
  justify-content: space-evenly;
  overflow: hidden;

  input {
    width: 3rem;
    height: 100%;
    outline: none;
    background-color: transparent;
    margin: 0;
    padding: 0;
    border: 0;
    text-align: center;
  }

  svg {
    font-size: 1.5rem;
  }
`;

const Price = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;

  svg {
    font-size: 2.5rem;
  }
`;
const Info = styled.div`
  height: 40rem;
  position: sticky;
  width: 95%;
  border: 0.1rem solid #e4e7ed;
  border-radius: 2rem;

  p {
    margin: 0;
    font-size: 3rem;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    height: 32rem;
  }
`;

const Cont = styled.div`
  width: 80%;
  margin: auto;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 3rem;

  button {
    width: 80%;
    margin: 3rem auto 0.5rem auto;
    height: 5rem;
    color: white;
    font-size: 1.6rem;
    font-weight: 600;
    border-radius: 2rem;
    border: none;
    padding: 0;
    background-color: #d10024;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
    gap: 0.8rem;
  }
`;

const SubTotal = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  width: 100%;
  margin: 2rem 0 0 0;

  p {
    font-size: 1.5rem;
    font-weight: 400;
  }
`;
const Shipping = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  width: 100%;

  p {
    font-size: 1.5rem;
    font-weight: 400;
  }
`;
const PreInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  p {
    font-size: 1.5rem;
  }
`;

const Payments = styled.div`
  img {
    height: 2.5rem;
    margin: 1.5rem 0.5rem 0 0.5rem;
  }
`;
export default Cart;
