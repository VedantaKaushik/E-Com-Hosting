import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PreNav from "../PreNav";
import Header from "../Header";
import PreFooter from "../PreFooter";
import Footer from "../Footer";
import axios from "axios";
import Loading from "../Loading";
import { ToastContainer, toast } from "react-toastify";

const TrackOrder = () => {
  // Title Change
  useEffect(() => {
    document.querySelector("title").textContent = "ECom | Track";
  });

  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const statusText = useRef(null);

  // get order Details
  const GetStatus = async () => {
    setLoading(true);
    // trimming the id
    const orderId = id.trim().replace(/ /g, "");

    if (id.length < 1) {
      setLoading(false);
      return toast("OrderId Cannot Be Empty", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    }

    const res = await axios.post(
      "https://voltssr.onrender.com/api/order/track",
      {
        orderId,
      }
    );

    if (res.data.sucess === true || res.data.sucess === false) {
      setLoading(false);
    }

    const info = res.data.order.status;
    const remarks = res.data.order.remarks;

    // Showing status
    if (info === "Unfulfilled") {
      statusText.current.textContent = `Your Order is ${info}, it will be Shipped Soon.`;
    }
    if (info === "Shipped") {
      statusText.current.textContent = `Your Order is ${info} with Tracking Id #${remarks.tracid} via ${remarks.courierName}.`;
    }
    if (info === "Returned") {
      statusText.current.textContent = `Your Order is ${info} back to the seller.`;
    }
    if (info === "Cancelled") {
      statusText.current.textContent = `Your Order was ${info}.`;
    }
    if (info === "Fulfilled") {
      statusText.current.textContent = `Your Order was Delivered.`;
    }
    return;
  };

  return (
    <>
      <PreNav />
      <Header />

      <Container>
        <Div>
          {loading ? <Loading /> : <></>}

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
          <TrackInput>
            <input
              type="text"
              placeholder="OrderId"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <button onClick={GetStatus}>Track</button>
          </TrackInput>
          <W>
            <p className="statusText" ref={statusText}></p>
          </W>
        </Div>
      </Container>

      <PreFooter />
      <Footer />
    </>
  );
};

// styled
const Container = styled.div`
  width: 100%;
  height: 50rem;
`;

const Div = styled.div`
  height: 100%;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const TrackInput = styled.div`
  height: 15rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  input {
    width: 50%;
    height: 4rem;
    margin: 0 2rem;
    outline: none;
    border-radius: 2rem;
    box-shadow: 0px 0px 0px 1px #e4e7ed;
    border: none;
    padding: 0 0 0 1.5rem;
  }

  button {
    width: 20%;
    height: 4rem;
    border: none;
    font-weight: 700;
    color: white;
    background-color: #d10024;
    cursor: pointer;
    border-radius: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;

    input {
      width: 60%;
    }
  }
`;

const W = styled.div`
  height: 10rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 2rem;
    margin: 1rem 0;
  }
`;
export default TrackOrder;
