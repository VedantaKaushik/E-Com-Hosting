import styled from "styled-components";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import PreNav from "./PreNav";
import Header from "./Header";
import PreFooter from "./PreFooter";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { updateCart } from "../redux/Slices/CartSlice";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import { ToastContainer, toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const SingleProduct = () => {
  const navigate = useNavigate();

  // Changing the title
  useEffect(() => {
    document.querySelector("title").textContent = "ECom | Product";
    document.querySelector("body").style.backgroundColor = "#FFF";
  });

  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);

  const [product, setProduct] = useState("");
  const [rati, setRati] = useState(0);
  const [sideImage, setSideImage] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [review, setReview] = useState([]);
  const [Review, setreview] = useState("");
  const [StockStatus, setStockStatus] = useState("");

  const { id } = useParams();

  // Getting The Product
  const getProduct = async () => {
    const res = await axios.get(
      `https://voltssr.onrender.com/api/product?id=${id}`
    );
    setProduct(res.data);
    setReview(res.data.review);
    setSideImage(res.data.images);
    setMainImage(res.data.images[0].url);
  };

  useEffect(() => {
    getProduct();
  }, []);

  // Soping The desc and Review
  const Descri = useRef(null);
  const RevBtn = useRef(null);
  const MobWrap = useRef(null);
  const ProDescDiv = useRef(null);

  const ShowDesc = () => {
    MobWrap.current.style.display = "none";
    RevBtn.current.style.color = "#8d99ae";
    ProDescDiv.current.style.display = "block";
    Descri.current.style.color = "#d10024";
  };

  const ShowRev = () => {
    MobWrap.current.style.display = "block";
    RevBtn.current.style.color = "#d10024";
    ProDescDiv.current.style.display = "none";
    Descri.current.style.color = "#8d99ae";
  };

  // Stock
  const ShopButtons = useRef(null);

  useEffect(() => {
    if (product.quantity === 0) {
      setStockStatus("Out Of Stock");
      ShopButtons.current.style.pointerEvents = "none";
    }

    if (product.quantity > 0) {
      setStockStatus("In Stock");
    }
  }, [product.quantity]);

  // review
  const userDetail = sessionStorage.getItem("user");
  const user = JSON.parse(userDetail);

  // Submit Review
  const SubmitReview = async () => {
    const userId = sessionStorage.getItem("userId");
    const users = review.map((users) => users.user._id);

    for (let index = 0; index < users.length; index++) {
      const m = users.includes(userId);
      if (m === true) {
        setloading(false);
        return toast("You Have Already Reviewed", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: 1,
        });
      }
    }

    setloading(true);
    if (Review.length > 230) {
      setloading(false);
      return toast("Only 25 Characters Allowed", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

    if (rati === 0) {
      setloading(false);
      return toast("Rating Cannot Be 0", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

    const revDesc = Review.trim().replace(/  +/g, " ");

    const data = { userId, rating: rati, revDesc };

    const res = await axios.post(
      `https://voltssr.onrender.com/api/features/review?id=${id}`,
      data
    );

    setReview(res.data.review);

    if (res.data.review) {
      setloading(false);
    }

    if (res.data.sucess === true) {
      setreview("");
      setRati(0);

      return toast("Review Added", {
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

  // Average review
  const TotalReview = review.map((rev) => rev.rating);
  const ReviewSum = TotalReview.reduce((e, v) => e + v, 0);
  const AverageRev = ReviewSum / review.length;

  // get All review
  const getRev = async () => {
    const res = await axios.get(
      `https://voltssr.onrender.com/api/product/reviews?id=${id}`
    );

    setReview(res.data.review);
  };

  useEffect(() => {
    getRev();
  }, [review]);

  return (
    <>
      <PreNav />
      <Header />

      {loading ? <Loading /> : <></>}

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

        <Div>
          <ProductDetail>
            <ProductImage>
              <ImageBar>
                {sideImage.length > 3 ? (
                  <>
                    <IconButton className="b">
                      <KeyboardArrowUpIcon
                        style={{
                          display: "block",
                        }}
                      />
                    </IconButton>

                    <Wrapper>
                      <ImageSlide>
                        {sideImage.map((image) => (
                          <img
                            src={image.url}
                            alt="."
                            key={image.url}
                            onClick={() => {
                              setMainImage(image.url);
                            }}
                          />
                        ))}
                      </ImageSlide>
                    </Wrapper>

                    <IconButton className="b">
                      <KeyboardArrowDownIcon
                        style={{
                          display: "block",
                        }}
                      />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton className="b">
                      <KeyboardArrowUpIcon />
                    </IconButton>

                    <Wrapper>
                      <ImageSlide>
                        {sideImage.map((image) => (
                          <img
                            src={image.url}
                            alt="."
                            key={image.url}
                            onClick={() => {
                              setMainImage(image.url);
                            }}
                          />
                        ))}
                      </ImageSlide>
                    </Wrapper>

                    <IconButton className="b">
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </>
                )}
              </ImageBar>
              <MainImage>
                <img src={mainImage} alt="." id="main-image" />
              </MainImage>
            </ProductImage>
            <ProductInfo>
              <ProductName>
                <p>{product.title}</p>
              </ProductName>
              <ProductReview>
                <Rating
                  name="half-rating-read"
                  defaultValue={0}
                  value={AverageRev}
                  precision={0.5}
                  readOnly
                  sx={{
                    svg: {
                      color: "#d10024",
                    },
                  }}
                />
                |<p>{review.length} reviews</p>
              </ProductReview>
              <ProductPrice>
                <p id="price">₹{product.price}</p>
                <p className="Stock">{StockStatus}</p>
              </ProductPrice>
              <ProductOptions>{/* Work Left */}</ProductOptions>
              <CallToAction className="Buttons" ref={ShopButtons}>
                <button
                  id="addToCart"
                  onClick={() => {
                    dispatch(updateCart(product));
                  }}
                >
                  Add To Cart
                </button>
                <button
                  id="buyNow"
                  onClick={() => {
                    dispatch(updateCart(product));
                    navigate("/checkout");
                  }}
                >
                  Buy Now
                </button>
              </CallToAction>
            </ProductInfo>
          </ProductDetail>

          {/* Description */}
          <DescDiv>
            <Select>
              <span id="span-1" />
              <p ref={Descri} id="desc" onClick={ShowDesc}>
                Description
              </p>
              <span id="span-2" />
              <p id="rev" ref={RevBtn} onClick={ShowRev}>
                Reviews
              </p>
              <span id="span-1" />
            </Select>

            <ProDesc id="pro-desc" ref={ProDescDiv}>
              <p>{product.description}</p>
            </ProDesc>

            <MobileWrapper id="MobileWrapper" ref={MobWrap}>
              <ProRev id="pro-rev">
                <UserReview>
                  {review.length === 0 ? (
                    <>
                      <p id="Err-Rev">No Reviews Yet.</p>
                    </>
                  ) : (
                    <>
                      {review.length > 4 ? (
                        <>
                          {review
                            .map((rev) => (
                              <RevLog key={rev.user._id}>
                                <U>
                                  <p>{rev.user.name}</p>
                                  <Rating
                                    name="read-only"
                                    value={rev.rating}
                                    readOnly
                                    sx={{
                                      svg: {
                                        color: "#d10024",
                                      },
                                    }}
                                  />
                                </U>
                                <D>
                                  <p id="review-description">{rev.revDesc}</p>
                                  <DeleteIcon id="delIcn" />
                                </D>
                              </RevLog>
                            ))
                            .slice(0, 4)}
                          <p className="viewmore">View All</p>
                        </>
                      ) : (
                        <>
                          {review.map((rev) => (
                            <RevLog key={rev.user._id}>
                              <U>
                                <p>{rev.user.name}</p>
                                <Rating
                                  name="read-only"
                                  value={rev.rating}
                                  readOnly
                                  sx={{
                                    svg: {
                                      color: "#d10024",
                                    },
                                  }}
                                />
                              </U>
                              <D>
                                <p id="review-description">{rev.revDesc}</p>
                                <DeleteIcon id="delIcn" />
                              </D>
                            </RevLog>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </UserReview>
                <WriteReview className="WriteRev">
                  {user !== null ? (
                    <>
                      <Lbl>
                        <p>Your Rating :</p>
                        <Rating
                          name="simple-controlled"
                          sx={{
                            fontSize: "2rem",
                            svg: {
                              color: "#d10024",
                            },
                          }}
                          value={rati}
                          onChange={(event, newValue) => {
                            setRati(newValue);
                          }}
                        />
                      </Lbl>
                      <textarea
                        id="review-field"
                        placeholder="Write A Review"
                        value={Review}
                        onChange={(e) => {
                          setreview(e.target.value);
                        }}
                      />

                      <button onClick={SubmitReview}>Submit</button>
                    </>
                  ) : (
                    <>
                      <Lbl>
                        <p>Your Rating :</p>
                        <Rating
                          name="simple-controlled"
                          sx={{
                            fontSize: "2rem",
                            svg: {
                              color: "#d10024",
                            },
                          }}
                          value={rati}
                          onChange={(event, newValue) => {
                            setRati(newValue);
                          }}
                          disabled={true}
                        />
                      </Lbl>
                      <textarea
                        id="review-field"
                        placeholder="Write A Review"
                        disabled={true}
                      />

                      <button
                        onClick={() => {
                          return toast("Plz Sign In To Write Review.", {
                            position: "bottom-center",
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: false,
                            pauseOnHover: false,
                            draggable: false,
                            progress: 1,
                          });
                        }}
                      >
                        Submit
                      </button>
                    </>
                  )}
                </WriteReview>
              </ProRev>
            </MobileWrapper>
          </DescDiv>
        </Div>
      </Container>

      <PreFooter />
      <Footer />
    </>
  );
};

// Styles
const Container = styled.div`
  width: 100%;
  height: fit-content;
  margin: 0;
  padding: 0;

  p {
    margin: 0;
  }
`;

const Div = styled.div`
  width: 80%;
  height: 100%;
  margin: 5rem auto;
`;

const ProductDetail = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const ProductName = styled.div`
  height: 4rem;
  margin: 1rem 0;

  p {
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 700;
  }
`;

const ProductReview = styled.div`
  display: flex;
  height: 2rem;
  margin: 1rem 0;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 500;
  gap: 0.5rem;
`;

const ProductPrice = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-transform: uppercase;
  margin: 1rem 0;
  flex-wrap: wrap;

  p {
    color: #d10024;
    font-size: 2.4rem;
    font-weight: 700;
  }

  #price {
    min-width: 5rem;
    max-width: fit-content;
  }

  .Stock {
    font-size: 1.2rem;
    margin: 0 0 0 4rem;
  }
`;

const ProductOptions = styled.div`
  display: flex;
  height: 5rem;
  margin: 1rem 0;
  align-items: center;
  justify-content: flex-start;

  .Qun {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 0.1rem solid #e4e7ed;
    width: 8rem;
    height: 75%;
    overflow: hidden;

    input {
      height: 100%;
      width: 100%;
      outline: none;
      border: none;
      background-color: transparent;
      text-align: center;
    }

    svg {
      width: 2rem;
      font-size: 2rem;
      font-weight: 500;
      cursor: pointer;
    }
  }
`;

const CallToAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  button {
    width: 70%;
    height: 5rem;
    margin: 1rem 0;
    border: none;
    border-radius: 2rem;
    color: white;
    font-size: 1.8rem;
    font-weight: 700;
    background-color: #ef233c;
    cursor: pointer;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const ProductImage = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  justify-items: center;
  align-items: center;
  height: 50rem;
  gap: 3rem;

  img {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
    height: 45rem;
  }
`;

const ImageBar = styled.div`
  display: grid;
  width: 10rem;
  grid-template-rows: 1fr 10fr 1fr;
  height: 45rem;
  justify-items: center;

  svg {
    font-size: 3rem;
    display: none;
  }

  .b {
    align-self: center;
    z-index: 99;
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 15rem;
  }
`;

const ImageSlide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  align-items: center;
  gap: 2rem;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: row;

    img {
      width: 8rem;
      height: 8rem;
    }
  }
`;

const Wrapper = styled.div`
  overflow: hidden;
`;

const MainImage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    width: 35rem;
    height: 30rem;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const DescDiv = styled.div`
  #desc {
    color: #d10024;
  }
`;

const Select = styled.div`
  display: flex;
  justify-content: center;
  height: 5rem;
  align-items: center;

  p {
    color: #8d99ae;
    font-weight: 700;
    font-size: 1.4rem;
    margin: 0 1rem;
    cursor: pointer;
  }

  #span-1 {
    width: -webkit-fill-available;
    height: 0.05rem;
    background: #8d99ae;
    opacity: 50%;
  }

  #span-2 {
    width: 10rem;
    height: 0.05rem;
    background: #8d99ae;
    opacity: 50%;
  }

  #desc {
    color: #d10024;
  }
`;

const ProDesc = styled.div`
  height: fit-content;
  margin: 2rem 0;
  font-size: 1.4rem;
  color: #333;
  font-weight: 400;
`;

const MobileWrapper = styled.div`
  display: none;
`;

const ProRev = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const RevLog = styled.div`
  display: flex;
  width: 100%;
  gap: 1.5rem;

  p {
    font-weight: 700;
    font-size: 1.4rem;
    margin: 0.5rem 0;
  }
`;

const D = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const U = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
`;

const UserReview = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;

  #review-description {
    font-size: 1.4rem;
    font-weight: 400;
  }

  #Err-Rev {
    font-size: 1.4rem;
    margin: 0 0 0 2rem;
  }

  #delIcn {
    font-size: 3rem;
    width: 10%;
    color: #ef233c;
    cursor: pointer;
    display: none; // Work left
  }

  .viewmore {
    height: 8rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    display: flex;
    height: 27rem;
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;

    .viewmore {
      height: 3rem;
    }
  }
`;

const WriteReview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 30rem;
  font-size: 1.4rem;
  justify-content: center;
  margin: 0 0 0 2rem;

  textarea {
    height: 10rem;
    width: 80%;
    padding: 1.5rem;
    margin: 1rem 0;
    outline: none;
    border: 0.1rem solid #e4e7ed;
    border-radius: 1rem;
    font-size: 1.4rem;
    font-weight: 400;
    resize: none;
  }

  ::placeholder {
    font-size: 1.4rem;
    color: #e4e7ed;
    font-weight: 400;
  }

  button {
    width: 40%;
    height: 5rem;
    margin: 1rem 0;
    border: none;
    border-radius: 1rem;
    color: white;
    font-size: 1.8rem;
    font-weight: 700;
    background-color: #ef233c;
    cursor: pointer;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    textarea {
      width: 90%;
    }
  }
`;

const Lbl = styled.div`
  p {
    margin: 1rem 0;
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

const ProductInfo = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
  }
`;

export default SingleProduct;
