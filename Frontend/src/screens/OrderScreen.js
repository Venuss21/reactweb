//import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./../components/Header";

const OrderScreen = ({ match }) => {

  window.scrollTo(0, 0);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading } = orderDetails;


  if (!loading) {
    //Calculater
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(0);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  return (

    <>
      <Header />
      <div className="col-12 alert alert-success text-center mt-3" style={{ fontSize: "20px", }}>
        Đặt hàng thành công !
        <Link
          className="btn btn-success mx-2 px-3 py-2"
          to="/"
          style={{
            fontSize: "20px",
          }}
        >
          Tiếp tục mua sắm !
        </Link>

      </div>

    </>
  )
};

export default OrderScreen;
