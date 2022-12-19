import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { updateCart } from "../redux/Slices/CartSlice";
import { useDispatch } from "react-redux";
import Rating from "@mui/material/Rating";

const FeaturedProducts = () => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState([]);

  const Fetch = async () => {
    const res = await axios.get(
      `https://voltssr.onrender.com/api/products?limit=6`
    );
    setProduct(res.data.products);
    return;
  };

  useEffect(() => {
    Fetch();
  }, []);

  // Average Rating
  const Avg = (rev) => {
    if (rev.length >= 1) {
      const TotalReview = rev.map((r) => r.rating);
      const ReviewSum = TotalReview.reduce((e, v) => e + v, 0);
      const AverageRev = ReviewSum / rev.length;
      return AverageRev;
    } else {
      return 0;
    }
  };

  const ProductCard = (
    <>
      {product &&
        product.map((products) => (
          <CardContainer key={products._id}>
            <CardBody>
              <Link to={`/product/${products._id}`}>
                <CardImage>
                  <img src={products.images[0].url} alt="." />
                </CardImage>
                <CardTitle>{products.title}</CardTitle>
                <CardRev>
                  <Rating
                    name="half-rating-read"
                    defaultValue={0}
                    value={Avg(products.review)}
                    precision={0.5}
                    readOnly
                    sx={{
                      svg: {
                        color: "#d10024",
                      },
                    }}
                  />
                  | <p> {products.review.length} reviews</p>
                </CardRev>
                <CardPrice>€{products.price}</CardPrice>
              </Link>
              <CardButton
                onClick={() => {
                  dispatch(updateCart(products));
                }}
              >
                ADD TO CART
              </CardButton>
            </CardBody>
          </CardContainer>
        ))}
    </>
  );

  return (
    <>
      <Container>
        <Div>
          <InfoDiv>
            <p>FEATURED PRODUCTS</p>
            <Sliderr style={{ display: "none" }}>
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </Sliderr>
          </InfoDiv>

          <Wrapper>
            <ProductList>{ProductCard}</ProductList>
          </Wrapper>
        </Div>
      </Container>
    </>
  );
};

// styles
const Container = styled.div`
  width: 100%;
  height: 60rem;
`;
const Div = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;

const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  P {
    font-size: 2.2rem;
    font-weight: 600;
    margin: 0;
    padding: 0;
  }
  @media (max-width: 768px) {
    margin: 3rem 0 0 0;
  }
`;

const Sliderr = styled.div`
  svg {
    font-size: 3rem;
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
`;

const ProductList = styled.div`
  gap: 1rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  height: 55rem;
  align-items: center;

  @media (max-width: 768px) {
  }

  @media (max-width: 998px) {
    grid-template-columns: repeat(6, 30%);
  }
  @media (max-width: 560px) {
    grid-template-columns: repeat(6, 32%);
  }
  @media (max-width: 400px) {
    grid-template-columns: repeat(6, 49%);
  }
  @media (max-width: 555px) {
    grid-template-columns: repeat(6, 45%);
  }
`;

// Product Cards
const CardContainer = styled.div`
  border: none;
  width: 25rem;
  height: 50rem;
  box-shadow: 0px 0px 0px 0px #e4e7ed, 0px 0px 0px 1px #e4e7ed;
  text-align: center;
  margin: 0.5rem;

  a {
    text-decoration: none;
    color: black;
  }

  @media (max-width: 768px) {
    width: 95%;
    height: 45rem;
  }

  @media (max-width: 998px) {
    width: 95%;
    height: 43rem;
  }
`;

const CardBody = styled.div`
  width: 85%;
  margin: 2.3rem auto;
`;

const CardImage = styled.div`
  img {
    height: 25rem;
    width: 100%;
  }

  @media (max-width: 998px) {
    img {
      height: 20rem;
      width: 90%;
    }
  }
`;

const CardTitle = styled.div`
  font-size: 1.6rem;
  height: 5rem;
  width: 100%;
  font-weight: 600;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardRev = styled.div`
  color: #d10024;
  font-size: 1.3rem;
  height: 2rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  p {
    margin: 0;
  }
`;

const CardPrice = styled.div`
  height: 4rem;
  font-size: 2rem;
  font-weight: 700;
  color: #d10024;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardButton = styled.button`
  width: 100%;
  height: 4rem;
  border: none;
  border-radius: 5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  background-color: #d10024;
  margin: 1rem 0;
  cursor: pointer;

  @media (max-width: 998px) {
    font-size: 1.2rem;
  }
`;

export default FeaturedProducts;
