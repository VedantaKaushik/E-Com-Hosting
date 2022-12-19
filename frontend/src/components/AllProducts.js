import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCards from "../components/ProductCards";
import PreNav from "../components/PreNav";
import Header from "../components/Header";
import SortIcon from "@mui/icons-material/Sort";
import TuneIcon from "@mui/icons-material/Tune";
import PreFooter from "../components/PreFooter";
import Footer from "../components/Footer";
import SearchedProduct from "./pages/SearchedProduct";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { GetAllProducts } from "../redux/Slices/GetAllProductSlice";
import { ToastContainer } from "react-toastify";

const AllProducts = () => {
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.features);
  const { productLength } = useSelector((state) => state.allProducts);

  const [page, setPage] = useState(1);

  const totalPage = Math.ceil(productLength / 8);
  useEffect(() => {
    document.querySelector("title").textContent = "Volts | Products";
  });

  useEffect(() => {
    const limit = 8;

    dispatch(GetAllProducts({ page, limit }));
  }, [page]);

  return (
    <>
      {product !== null ? (
        <SearchedProduct />
      ) : (
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
          <FilterDiv>
            <Sort style={{ display: "none" }}>
              <SortIcon />
              <span>Sort</span>
              <select>
                <option>Price Ascending</option>
                <option>Price Descending</option>
              </select>
            </Sort>
            <Filter style={{ display: "none" }}>
              <TuneIcon />
              <p>filter</p>
            </Filter>
          </FilterDiv>
          <Container>
            <ProductCards />
          </Container>

          {productLength <= 8 ? (
            <></>
          ) : (
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
          )}

          <PreFooter />
          <Footer />
        </>
      )}
    </>
  );
};

// styled
const PageContainer = styled.div`
  width: 80%;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6rem;
`;

const FilterDiv = styled.div`
  width: 80%;
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
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 110rem;
  margin: 2rem auto;
  gap: 4rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
  @media (max-width: 1100px) {
    width: 53rem;
  }
`;

export default AllProducts;
