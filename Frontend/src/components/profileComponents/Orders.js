import moment from "moment";
import 'moment/locale/vi';
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
const Orders = (props) => {
  const { loading, error, orders } = props;
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
              Không có đơn đặt hàng
              <Link
                className="btn btn-success mx-2 px-3 py-2"
                to="/"
                style={{
                  fontSize: "12px",
                }}
              >
                Bắt đầu mua sắm.
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID đơn hàng</th>
                    <th>Trạng thái</th>
                    <th>Ngày đặt hàng</th>
                    <th>Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      className={`${order.isDelivered ? "alert-success" : "alert-red"
                        }`}
                      key={order._id}
                    >
                      <td>
                        {order._id}
                      </td>
                      <td>{order.isDelivered ? <>Đã nhận hàng ({moment(order.deliveredAt).format('L')})</> : <>Chưa giao hàng</>}</td>

                      <td>
                        {order.isDelivered
                          ? moment(order.createdAt).format('L')
                          : moment(order.createdAt).format('L')}
                      </td>
                      <td>{VND.format(order.totalPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
