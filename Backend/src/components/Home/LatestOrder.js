import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import moment from "moment";

const LatestOrder = (props) => {
  const { loading, error, orders } = props;
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return (
    <div className="card-body">
      <h5 className="card-title">Đặt hàng mới</h5>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id}>
                  <td>
                    <b>{order.user?.name}</b>
                  </td>
                  <td>{order.user?.email}</td>
                  <td>{VND.format(order.totalPrice)} </td>
                  <td>
                    {order.isDelivered ? (
                      <span className="badge rounded-pill alert-success">
                        Đã giao hàng vào {moment(order.paidAt).format('L')}
                      </span>
                    ) : (
                      <span className="badge rounded-pill alert-danger">
                        Chưa giao hàng
                      </span>
                    )}
                  </td>
                  <td>{moment(order.createdAt).format('LLLL')}</td>
                  <td className="d-flex justify-content-end align-item-center">
                    <Link to={`/order/${order._id}`} className="text-success">
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestOrder;
