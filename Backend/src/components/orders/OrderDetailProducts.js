import React from "react";
import { Link } from "react-router-dom";

const OrderDetailProducts = (props) => {
  const { loading, order } = props;

  if (!loading) {
    // Calculate Price
    const addDecimal = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimal(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Sản phẩm</th>
          <th style={{ width: "20%" }}>Đơn giá</th>
          <th style={{ width: "20%" }}>Số lượng</th>
          <th style={{ width: "20%" }} className="text-end">
            Tổng giá
          </th>
        </tr>
      </thead>
      <tbody>
        {order.orderItems.map((item, index) => (
          <tr key={index}>
            <td>
              <Link className="itemside" to="#">
                <div className="left">
                  <img
                    src={item.image.url}
                    alt={item.name}
                    style={{ width: "40px", height: "40px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">{item.name}</div>
              </Link>
            </td>
            <td>{VND.format(item.price)}</td>
            <td>{item.qty}</td>
            <td className="text-end"> {VND.format(item.price * item.qty)}</td>
          </tr>
        ))}

        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Tổng giá sản phẩm:</dt> <dd>{VND.format(order.itemsPrice)}</dd>
              </dl>
              <dl className="dlist">
                <dt>Phí vận chuyển:</dt> <dd>{VND.format(order.shippingPrice)}</dd>
              </dl>
              <dl className="dlist">
                <dt>Tổng thu:</dt>
                <dd>
                  <b className="h5">{VND.format(order.totalPrice)}</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Trạng thái:</dt>
                <dd>
                  {order.isDelivered ? (
                    <span className="badge rounded-pill alert alert-success text-success">
                      Đã giao hàng
                    </span>
                  ) : (
                    <span className="badge rounded-pill alert alert-success text-danger">
                      Chờ giao hàng
                    </span>
                  )}
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
