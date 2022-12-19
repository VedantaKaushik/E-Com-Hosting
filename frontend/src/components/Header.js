import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { getQuery, searchApi, resetState } from "../redux/Slices/FeatureSlice";
import { ToastContainer, toast } from "react-toastify";
import { SearchCatagory } from "../redux/Slices/CatagorySlice";

const Header = () => {
  const { product, sq, error } = useSelector((state) => state.features);

  const path = window.location.pathname;

  const dispatch = useDispatch();
  const [search, setSearch] = useState(sq);
  const { totalQuantity } = useSelector((state) => state.cart);

  //Opening and Closing Nav
  const OpenNav = () => {
    const MenuToggle = document.querySelector("#Menu-Toggle");

    if (MenuToggle.style.transform === "translate(-100%)") {
      MenuToggle.style.transform = "translate(0)";
    } else {
      MenuToggle.style.transform = "translate(-100%)";
    }
  };

  // Search Func
  let q = search.replace(/  +/g, " ").trim();
  const navigate = useNavigate();

  const SearchFunc = () => {
    if (q.length < 3) {
      return toast("Search Query Should Be Greater Than 3 haracters", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

    dispatch(getQuery(q));
    const limit = 8;
    const page = 1;
    dispatch(searchApi({ q, limit, page }));
  };

  useEffect(() => {
    if (error !== null) {
      return;
    }
    if (product !== null) {
      navigate(`/products/${sq}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, product]);

  useEffect(() => {
    // Home
    if (path === "/") {
      document.querySelector("#home").classList.add("active");
    } else {
      document.querySelector("#home").classList.remove("active");
    }
    // Products
    if (path === "/products") {
      document.querySelector("#products").classList.add("active");
    } else {
      document.querySelector("#products").classList.remove("active");
    }
    // earbuds
    if (path === "/products/category/WirelessEarbuds") {
      document.querySelector("#earbuds").classList.add("active");
    } else {
      document.querySelector("#earbuds").classList.remove("active");
    }
    // charger
    if (path === "/products/category/Chargers") {
      document.querySelector("#charger").classList.add("active");
    } else {
      document.querySelector("#charger").classList.remove("active");
    }
    // Headphone
    if (path === "/products/category/Headphones") {
      document.querySelector("#headphone").classList.add("active");
    } else {
      document.querySelector("#headphone").classList.remove("active");
    }
  });

  return (
    <div>
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
          <Info>
            <Link
              to="/"
              onClick={() => {
                dispatch(resetState());
              }}
            >
              <p className="logo">Volts.</p>
            </Link>
          </Info>
          <Search>
            <input
              type="text"
              placeholder="Search here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={SearchFunc}>Search</button>
          </Search>
          <Info>
            <Cart>
              {totalQuantity < 1 ? (
                <>
                  <Link
                    to="/cart"
                    onClick={() => {
                      dispatch(resetState());
                    }}
                  >
                    <ShoppingCartIcon />
                    <p>Your Cart</p>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/cart"
                    onClick={() => {
                      dispatch(resetState());
                    }}
                  >
                    <Badge
                      badgeContent={totalQuantity}
                      sx={{
                        span: {
                          backgroundColor: "#d10024",
                        },
                      }}
                    >
                      <ShoppingCartIcon />
                    </Badge>
                    <p>Your Cart</p>
                  </Link>
                </>
              )}
              <MenuOpen>
                <MenuIcon id="menu-open" onClick={OpenNav} />
                <p>Menu</p>
              </MenuOpen>
            </Cart>
          </Info>
        </Div>
      </Container>
      <Line />

      {/* Nav */}
      <Containerr>
        <Divv>
          <NavItems>
            <Link
              to="/"
              onClick={() => {
                dispatch(resetState());
              }}
            >
              <span id="home">Home</span>
            </Link>

            <Link
              to="/products"
              onClick={() => {
                dispatch(resetState());
              }}
            >
              <span id="products">Products</span>
            </Link>

            <Link
              to={`/products/category/${"WirelessEarbuds"}`}
              id="earbuds"
              onClick={() => {
                dispatch(
                  SearchCatagory({
                    catagory: "Wireless Earbuds",
                    page: 1,
                    limit: 8,
                  })
                );
                dispatch(resetState());
              }}
            >
              Wireless Earbuds
            </Link>

            <Link
              to={`/products/category/${"Chargers"}`}
              id="charger"
              onClick={() => {
                dispatch(
                  SearchCatagory({
                    catagory: "charger",
                    page: 1,
                    limit: 8,
                  })
                );
                dispatch(resetState());
              }}
            >
              Chargers
            </Link>

            <Link
              id="headphone"
              to={`/products/category/${"Headphones"}`}
              onClick={() => {
                dispatch(
                  SearchCatagory({
                    catagory: "headphone",
                    page: 1,
                    limit: 8,
                  })
                );
                dispatch(resetState());
              }}
            >
              Headphones
            </Link>
          </NavItems>
        </Divv>
      </Containerr>

      {/* Mobile Nav */}
      <MobileContainer
        id="Menu-Toggle"
        style={{ transform: "translate(-100%)" }}
      >
        <MobileNav>
          <MobileNavItems>
            <Link
              to="/"
              onClick={() => {
                dispatch(resetState());
              }}
            >
              <span id="home">Home</span>
            </Link>

            <Link
              to="/products"
              onClick={() => {
                dispatch(resetState());
              }}
            >
              Products
            </Link>

            <Link
              to={`/products/category/${"WirelessEarbuds"}`}
              id="earbuds"
              onClick={() => {
                dispatch(
                  SearchCatagory({
                    catagory: "Wireless Earbuds",
                    page: 1,
                    limit: 8,
                  })
                );
                dispatch(resetState());
              }}
            >
              Wireless Earbuds
            </Link>

            <Link
              to={`/products/category/${"Chargers"}`}
              id="charger"
              onClick={() => {
                dispatch(
                  SearchCatagory({
                    catagory: "charger",
                    page: 1,
                    limit: 8,
                  })
                );
                dispatch(resetState());
              }}
            >
              Chargers
            </Link>

            <Link
              id="headphone"
              to={`/products/category/${"Headphones"}`}
              onClick={() => {
                dispatch(
                  SearchCatagory({
                    catagory: "headphone",
                    page: 1,
                    limit: 8,
                  })
                );
                dispatch(resetState());
              }}
            >
              Headphones
            </Link>
          </MobileNavItems>
        </MobileNav>
      </MobileContainer>
      {/*  */}
    </div>
  );
};

// style
const Container = styled.div`
  height: 10rem;
  background-color: #15161d;

  p {
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
  }

  @media (max-width: 768px) {
    height: 25rem;
  }
`;

const Div = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  justify-items: center;

  @media (max-width: 768px) {
    width: 95%;
    grid-template-columns: none;
  }
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;

  .logo {
    font-size: 5rem;
    color: white;
    font-weight: 800;
    justify-self: start;
  }

  @media (max-width: 768px) {
    font-size: 6rem;
    justify-content: center;
    align-items: center;
  }
`;

const Search = styled.div`
  border: none;
  height: 4rem;
  width: 90%;
  border-radius: 5rem;
  display: flex;
  overflow: hidden;

  input {
    width: 80%;
    padding: 0 0 0 1rem;
    border: none;
    outline: none;
    height: 100%;
    font-size: 1.5rem;
    font-weight: 300;
    font-style: italic;
  }

  button {
    width: 20%;
    height: 100%;
    border: none;
    font-weight: 700;
    color: white;
    background-color: #d10024;
    cursor: pointer;
  }
`;

const Cart = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  width: 100%;
  font-size: 1.2rem;

  a {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  svg {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    width: fit-content;
    width: 95%;
    justify-content: flex-end;
    gap: 40%;
    align-items: center;
  }
`;

const MenuOpen = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: fit-content;
  font-size: 1.2rem;
  color: white;
  margin: 0 2rem 0 0;
  cursor: pointer;

  svg {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    display: flex;
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

//  Nav
const Containerr = styled.div`
  width: 100%;
  background-color: white;
  height: 6rem;
  border-bottom: 0.2rem solid #e4e7ed;

  @media (max-width: 768px) {
    display: none;
  }

  .active {
    color: #d10024;
  }
`;

const Divv = styled.div`
  width: 80%;
  height: 100%;
  background-color: transparent;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const NavItems = styled.div`
  width: 100%;
  gap: 4rem;
  display: flex;
  font-size: 1.6rem;
  font-weight: 500;

  a {
    text-decoration: none;
    color: black;
    padding: 0.8rem;
  }

  a:hover {
    color: #d10024;
    transition: all 0.3s;
  }
`;

const MobileContainer = styled.div`
  height: 100vh;
  width: 75%;
  position: fixed;
  z-index: 999;
  top: 0;
  background-color: #15161d;
  bottom: 0;
  left: 0;
  font-size: 1.6rem;
  font-weight: 600;
  transform: translate(-100%);
  transition: all 0.5s linear;

  a {
    text-decoration: none;
    color: white;
  }

  .active {
    color: #d10024;
  }
`;

const MobileNav = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileNavItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 5rem;
  height: 60%;
  width: 80%;
`;

export default Header;
