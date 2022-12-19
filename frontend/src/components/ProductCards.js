import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../redux/Slices/CartSlice";
import Rating from "@mui/material/Rating";

const ProductCards = () => {
  const { products } = useSelector((state) => state.allProducts);

  const dispatch = useDispatch();

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

  return (
    <>
      {products &&
        products.map((product) => (
          <CardContainer key={product._id}>
            <CardBody>
              <Link to={`/product/${product._id}`}>
                <CardImage>
                  <img src={product.images[0].url} alt="." />
                </CardImage>
                <CardTitle>{product.title}</CardTitle>
                <CardRev>
                  <Rating
                    name="half-rating-read"
                    defaultValue={0}
                    value={Avg(product.review)}
                    precision={0.5}
                    readOnly
                    sx={{
                      svg: {
                        color: "#d10024",
                      },
                    }}
                  />
                  | <p>{product.review.length} reviews</p>
                </CardRev>
                <CardPrice>€{product.price}</CardPrice>
              </Link>
              <CardButton
                onClick={() => {
                  dispatch(updateCart(product));
                }}
              >
                ADD TO CART
              </CardButton>
            </CardBody>
          </CardContainer>
        ))}
    </>
  );
};

// styles
// Product Cards
const CardContainer = styled.div`
  border: none;
  width: 23rem;
  height: 50rem;
  box-shadow: 0px 0px 0px 0px #e4e7ed, 0px 0px 0px 1px #e4e7ed;
  text-align: center;
  margin: 0.5rem;

  a {
    text-decoration: none;
    color: black;
  }

  @media (max-width: 768px) {
    width: 30rem;
  }
`;

const CardBody = styled.div`
  width: 80%;
  margin: 2rem auto;
`;

const CardImage = styled.div`
  img {
    height: 20rem;
    width: 100%;
  }

  @media (max-width: 768px) {
    img {
      width: 80%;
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
  display: flex;
  height: 2rem;
  margin: 1rem 0;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 500;
  gap: 0.5rem;
  justify-content: center;
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
`;
export default ProductCards;
