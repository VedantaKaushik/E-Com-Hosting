import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { getQuery, searchApi } from "../redux/Slices/FeatureSlice";
import { ToastContainer, toast } from "react-toastify";
import { SearchCatagory } from "../redux/Slices/CatagorySlice";

// work left

const Header = () => {
  const { sq } = useSelector((state) => state.features);

  const dispatch = useDispatch();
  const location = useLocation();
  const [search, setSearch] = useState(sq);

  const { totalQuantity } = useSelector((state) => state.cart);

  //Opening and Closing Nav
  const MenuToggle = useRef(null);
  const OpenNav = () => {
    if (MenuToggle.current.style.transform === "translate(-100%)") {
      MenuToggle.current.style.transform = "translate(0)";
    } else {
      MenuToggle.current.style.transform = "translate(-100%)";
    }
  };

  // Search Func
  let q = search.replace(/  +/g, " ").trim();
  const navigate = useNavigate();
  const select = "Relevance";

  const SearchFunc = async () => {
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
    dispatch(searchApi({ q, limit, page, select }));
    navigate(`/products/${q}`);
  };

  const HomeNav = useRef(null);
  const HomeNavMobile = useRef(null);
  const ProductsNav = useRef(null);
  const ProductsNavMobile = useRef(null);
  const WirelessEarbudsNav = useRef(null);
  const WirelessEarbudsNavMobile = useRef(null);
  const ChargersNav = useRef(null);
  const ChargersNavMobile = useRef(null);
  const HeadphoneNav = useRef(null);
  const HeadphoneNavMobile = useRef(null);

  useEffect(() => {
    if (location.pathname === "/") {
      HomeNav.current.style.color = "#d10024";
      HomeNavMobile.current.style.color = "#d10024";
    } else {
      HomeNav.current.style.color = "black";
      HomeNavMobile.current.style.color = "white";
    }

    if (location.pathname === "/products") {
      ProductsNav.current.style.color = "#d10024";
      ProductsNavMobile.current.style.color = "#d10024";
    } else {
      ProductsNav.current.style.color = "black";
      ProductsNavMobile.current.style.color = "white";
    }

    if (location.pathname === "/products/category/WirelessEarbuds") {
      WirelessEarbudsNav.current.style.color = "#d10024";
      WirelessEarbudsNavMobile.current.style.color = "#d10024";
    } else {
      WirelessEarbudsNav.current.style.color = "black";
      WirelessEarbudsNavMobile.current.style.color = "white";
    }

    if (location.pathname === "/products/category/Chargers") {
      ChargersNav.current.style.color = "#d10024";
      ChargersNavMobile.current.style.color = "#d10024";
    } else {
      ChargersNav.current.style.color = "black";
      ChargersNavMobile.current.style.color = "white";
    }

    if (location.pathname === "/products/category/Headphones") {
      HeadphoneNav.current.style.color = "#d10024";
      HeadphoneNavMobile.current.style.color = "#d10024";
    } else {
      HeadphoneNav.current.style.color = "black";
      HeadphoneNavMobile.current.style.color = "white";
    }
  }, [location.pathname]);

  return (
    <>
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
              <Link to="/" onClick={() => {}}>
                <p className="logo">ECom</p>
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
                    <Link to="/cart" onClick={() => {}}>
                      <ShoppingCartIcon />
                      <p>Your Cart</p>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/cart" onClick={() => {}}>
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
              <Link to="/" onClick={() => {}} ref={HomeNav}>
                Home
              </Link>

              <Link to="/products" onClick={() => {}} ref={ProductsNav}>
                Products
              </Link>

              <Link
                to={`/products/category/${"WirelessEarbuds"}`}
                onClick={() => {
                  dispatch(
                    SearchCatagory({
                      catagory: "WirelessEarbuds",
                      page: 1,
                      limit: 8,
                      select,
                    })
                  );
                }}
                ref={WirelessEarbudsNav}
              >
                Wireless Earbuds
              </Link>

              <Link
                to={`/products/category/${"Chargers"}`}
                onClick={() => {
                  dispatch(
                    SearchCatagory({
                      catagory: "charger",
                      page: 1,
                      limit: 8,
                      select,
                    })
                  );
                }}
                ref={ChargersNav}
              >
                Chargers
              </Link>

              <Link
                to={`/products/category/${"Headphones"}`}
                onClick={() => {
                  dispatch(
                    SearchCatagory({
                      catagory: "headphone",
                      page: 1,
                      limit: 8,
                      select,
                    })
                  );
                }}
                ref={HeadphoneNav}
              >
                Headphones
              </Link>
            </NavItems>
          </Divv>
        </Containerr>

        {/* Mobile Nav */}
        <MobileContainer
          id="Menu-Toggle"
          ref={MenuToggle}
          style={{ transform: "translate(-100%)" }}
        >
          <MobileNav>
            <MobileNavItems>
              <Link to="/" onClick={() => {}} ref={HomeNavMobile}>
                Home
              </Link>

              <Link to="/products" onClick={() => {}} ref={ProductsNavMobile}>
                Products
              </Link>

              <Link
                to={`/products/category/${"WirelessEarbuds"}`}
                id="earbuds"
                onClick={() => {
                  dispatch(
                    SearchCatagory({
                      catagory: "WirelessEarbuds",
                      page: 1,
                      limit: 8,
                      select,
                    })
                  );
                }}
                ref={WirelessEarbudsNavMobile}
              >
                Wireless Earbuds
              </Link>

              <Link
                to={`/products/category/${"Chargers"}`}
                onClick={() => {
                  dispatch(
                    SearchCatagory({
                      catagory: "charger",
                      page: 1,
                      limit: 8,
                      select,
                    })
                  );
                }}
                ref={ChargersNavMobile}
              >
                Chargers
              </Link>

              <Link
                to={`/products/category/${"Headphones"}`}
                onClick={() => {
                  dispatch(
                    SearchCatagory({
                      catagory: "headphone",
                      page: 1,
                      limit: 8,
                      select,
                    })
                  );
                }}
                ref={HeadphoneNavMobile}
              >
                Headphones
              </Link>
            </MobileNavItems>
          </MobileNav>
        </MobileContainer>
        {/*  */}
      </div>
    </>
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
