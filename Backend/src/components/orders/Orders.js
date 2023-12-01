import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import 'moment/locale/vi';

const Orders = (props) => {
  const { sortOrders } = props;
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Tên</th>
          <th scope="col">Email</th>
          <th scope="col">Tổng</th>
          <th scope="col">Trạng thái</th>
          <th>Ngày Tạo đơn</th>
          <th scope="col" className="text-end">
            Hành động
          </th>
        </tr>
      </thead>
      <tbody>
        {sortOrders.length ? (
          sortOrders.map((order) => (
            <tr key={order._id}>
              <td>
                <b>{order.user.name}</b>
              </td>
              <td>{order.user.email}</td>
              <td>{VND.format(order.totalPrice)}</td>
              {/* <td>
                {order.isPaid ? (
                  <span className="badge rounded-pill alert-success">
                    Paid At {moment(order.paidAt).format("MMM Do YY")}
                  </span>
                ) : (
                  <span className="badge rounded-pill alert-danger">
                    Chưa thanh toán
                  </span>
                )}
              </td> */}
              {order.isDelivered ? (
                <span className="badge rounded-pill alert-success">
                  Đã giao hàng vào {moment(order.deliveredAt).format('L')}
                </span>
              ) : (
                <span className="badge rounded-pill alert-danger">
                  Chờ giao hàng
                </span>
              )}
              <td>{moment(order.createdAt).format('L')}</td>
              <td>
                {order.isDelivered ? (
                  <span className="badge btn-success">Giao hàng thành công</span>
                ) : (
                  <span className="badge btn-dark">Chưa giao hàng</span>
                )}
              </td>
              <td className="d-flex justify-content-end align-item-center">
                <Link to={`/order/${order._id}`} className="text-success">
                  <i className="fas fa-eye"></i>
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <th colSpan={10}>
              <div className="d-flex justify-content-center col-12">
                <div className="alert alert-warning">Không có đơn đặt hàng</div>
              </div>
            </th>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Orders;
