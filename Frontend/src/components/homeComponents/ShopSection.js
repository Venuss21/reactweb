import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { lisCategories } from "../../redux/Actions/CategoryActions";
import { listProduct } from "../../redux/Actions/ProductActions";
import { ORDER_DETAILS_RESET } from "../../redux/Constants/OrderConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Pagination from "./pagination";
import Rating from "./Rating";
import "./ShopSection.css";

const ShopSection = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { loading: loadingList, error: errorList, categories } = categoryList;

  const [searchProduct, setSearchProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [sortName] = useState([
    "Giá: thấp -> cao",
    "Giá: cao -> thấp",
  ]);
  const [selectedSort, setSelectedSort] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    dispatch(listProduct());
    dispatch(lisCategories());
    dispatch({ type: ORDER_DETAILS_RESET });
  }, [dispatch]);

  // Search product
  const searchProducts = products?.filter((product) => {
    if (searchProduct === "") {
      return product;
    } else if (
      product.name.toLowerCase().includes(searchProduct.toLowerCase())
    ) {
      return product;
    }
  });

  // Filter by category
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const getFilterList = () => {
    if (!selectedCategory) {
      return searchProducts;
    }
    return searchProducts.filter(
      (product) => product.category === selectedCategory
    );
  };

  const filterList = useMemo(getFilterList, [selectedCategory, searchProducts]);

  // Sort
  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const getSortList = () => {
    if (!selectedSort) {
      return filterList;
    } else if (selectedSort === "Giá: thấp -> cao") {
      return filterList?.sort((a, b) => (a.price > b.price ? 1 : -1));
    } else if (selectedSort === "Giá: cao -> thấp") {
      return filterList?.sort((a, b) => (a.price > b.price ? -1 : 1));
    }
  };

  const sortList = useMemo(getSortList, [selectedSort, filterList]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortList
    ? sortList.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return (
    <>
      <div className="container mt-3">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="card mb-4 shadow-sm mx-3">
                <header className="card-header gradient">
                  <div className="row gx-3 py-3">
                    {/* <div className="col-lg-4 col-md-6 me-auto py-1">
                      <input
                        type="search"
                        placeholder="Search..."
                        className="form-control"
                        onChange={(e) => setSearchProduct(e.target.value)}
                      />
                    </div> */}
                    <div className="col-lg-3 col-md-3 py-1">
                      {loadingList ? (
                        <Loading />
                      ) : errorList ? (
                        <Message variant="alert-danger">{errorList}</Message>
                      ) : (
                        <select
                          name="category"
                          className="form-select"
                          onChange={handleCategoryChange}
                        >
                          <option value="">Danh mục sản phẩm</option>
                          {categories.map((category) => (
                            <option value={category._id} key={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    <div className="col-lg-2 col-md-3 py-1">
                      <select
                        name="sort"
                        className="form-select"
                        onChange={handleSortChange}
                      >
                        <option value="">Lọc theo giá</option>
                        {sortName.map((name) => (
                          <option value={name} key={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className=" col-md-7 me-auto py-1">
                      <input
                        type="search"
                        placeholder="Tìm kiếm ..."
                        className="form-control"
                        onChange={(e) => setSearchProduct(e.target.value)}
                      />
                    </div>
                  </div>
                </header>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {currentProducts.map((product) => (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={product._id}
                      >
                        <div className="border-product shadow-sm font-roboto">
                          <Link to={`/products/${product._id}`}>
                            <div
                              className="shopBack"
                              style={{
                                width: "100%",
                              }}
                            >
                              <img className="font-roboto"
                                src={product.image?.url}
                                alt={product.name}
                              />
                            </div>
                          </Link>

                          <div className="shoptext font-aria">
                            <p>
                              <Link to={`/products/${product._id}`}>
                                {product.name}
                              </Link>
                            </p>

                            <Rating
                              value={product.rating}
                              text={`${product.numReviews} reviews`}
                            />
                            <h3>{VND.format(product.price)}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {/* Pagination */}
                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={sortList ? sortList.length : 0}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
