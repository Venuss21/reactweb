import React from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import { Link } from "react-router-dom";
// import SaleStatistics from "./SalesStatistics";
// import ProductsStatistics from "./ProductsStatistics";

import { useSelector } from "react-redux";

const Main = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">
            <Link to="/" className="brand-wrap">
              <img
                src="/images/logoanime.png"
                style={{ height: "46" }}
                className="logo"
                alt="Ecommerce dashboard template"
              />
            </Link></h2>
        </div>
        {/* Top Total */}
        <TopTotal orders={orders} products={products} />

        <div className="row">

          {/* <SaleStatistics />
          <ProductsStatistics /> */}
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
