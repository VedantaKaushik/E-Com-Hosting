import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PreNav from "./PreNav";
import Header from "./Header";
import SortIcon from "@mui/icons-material/Sort";
import TuneIcon from "@mui/icons-material/Tune";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateCart } from "../redux/Slices/CartSlice";
import Footer from "./Footer";
import PreFooter from "./PreFooter";
import Rating from "@mui/material/Rating";
import Pagination from "@mui/material/Pagination";
import { resetState } from "../redux/Slices/FeatureSlice";
import { SearchCatagory } from "../redux/Slices/CatagorySlice";

const ProCatagory = () => {
  useEffect(() => {
    document.querySelector("title").textContent = `ECom | Products`;
    document.querySelector("body").style.backgroundColor = "#FFF";
  });

  const { error, products, proLength } = useSelector((s) => s.catagory);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const options = [
    {
      text: "Relevance",
      value: "Relevance",
    },
    {
      text: "Price Ascending",
      vlaue: "rice Ascending",
    },
    {
      text: "Price Descending",
      value: "Price Descending",
    },
  ];

  const [page, setPage] = useState(1);

  const [Product, setProduct] = useState([]);
  const [select, setSelect] = useState(options[0].value);

  useEffect(() => {
    setProduct(products);
  }, [products]);

  useEffect(() => {
    const limit = 8;
    let catagory = id;

    // eslint-disable-next-line default-case
    switch (id) {
      case "Chargers":
        catagory = "Charger";
        break;
      case "WirelessEarbuds":
        catagory = "WirelessEarbud";
        break;
      case "Headphones":
        catagory = "Headphone";
        break;
    }

    dispatch(SearchCatagory({ catagory, page, limit, select }));
    setProduct(products);
  }, [select]);

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

  const totalPage = Math.ceil(proLength / 8);

  const changeSelect = (e) => {
    setSelect(e.target.value);
  };

  return (
    <>
      <PreNav />
      <Header />
      <Container>
        {Product.length < 1 || Product === null || error ? (
          <>
            <NoProFound>
              <p>{`No Result Found`}</p>
              <Link to={`/products`}>Go Back To All Products</Link>
            </NoProFound>
          </>
        ) : (
          <>
            <FilterDiv>
              <Sort>
                <SortIcon />
                <select value={select} onChange={changeSelect}>
                  {options.map((option) => (
                    <option key={option.text}>{option.text}</option>
                  ))}
                </select>
              </Sort>
              <Filter style={{ display: "none" }}>
                <TuneIcon />
                <p>filter</p>
              </Filter>
            </FilterDiv>

            <Containerr>
              {Product.map((products) => (
                <CardContainer key={products._id}>
                  <CardBody>
                    <span
                      onClick={() => {
                        navigate(`/product/${products._id}`);
                      }}
                    >
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
                        | <p>{products.review.length} reviews</p>
                      </CardRev>
                      <CardPrice>₹{products.price}</CardPrice>
                    </span>
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
            </Containerr>
          </>
        )}

        {proLength <= 8 ? (
          <></>
        ) : (
          <PageContainer className="pagination">
            <PageContainer className="pagination">
              <Pagination
                count={totalPage}
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={(e, v) => {
                  setPage(v);
                }}
              />
            </PageContainer>
          </PageContainer>
        )}
      </Container>
      <PreFooter />
      <Footer />
    </>
  );
};

// styled
const Containerr = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  margin: 2rem auto;
  gap: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
  @media (max-width: 1449px) {
    width: 100%;
  }
  @media (max-width: 997px) {
    width: 100%;
  }
`;

const PageContainer = styled.div`
  width: 80%;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6rem;
`;

const NoProFound = styled.div`
  height: 40rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;

  p {
    margin: 2rem 0 0 0;
    font-size: 1.8rem;
  }

  a {
    font-size: 1.2rem;
  }
`;

const FilterDiv = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0;
    font-weight: 500;
  }

  svg {
    font-size: 2rem;
  }

  select {
    font-size: 1rem;
    width: 2rem;
    border: none;
    background-color: transparent;
  }
`;

const Filter = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  align-items: center;
  font-size: 1.5rem;
  margin: 0 2rem 0 0;
  gap: 0.5rem;
  cursor: pointer;
`;

const Sort = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  align-items: center;
  font-size: 1.5rem;
  margin: 0 0 0 2rem;
  gap: 0.5rem;
  cursor: pointer;

  select {
    width: fit-content;
    height: 3rem;
    font-size: 1.5rem;
    outline: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 80%;
  margin: 2rem auto;
  gap: 4rem;

  @media (max-width: 768px) {
    justify-content: center;
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
    width: 60%;
    height: 45rem;
  }

  @media (max-width: 998px) {
    width: 40%;
    height: 43rem;
  }

  @media (max-width: 350px) {
    width: 80%;
  }
  @media (max-width: 405px) {
    width: 80%;
  }
`;

const CardBody = styled.div`
  width: 85%;
  margin: 2.3rem auto;

  span {
    cursor: pointer;
    /* z-index: 99; */
  }
`;

const CardImage = styled.div`
  img {
    height: 25rem;
    width: 100%;
  }

  @media (max-width: 998px) {
    img {
      height: 20rem;
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
  font-size: 1.3rem;
  height: 2rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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

export default ProCatagory;
