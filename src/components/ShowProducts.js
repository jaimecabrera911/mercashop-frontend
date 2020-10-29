import React, { useState, useEffect } from "react";
import { Pagination } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../store/actions/productAction";
import ProductsCard from "./ProductsCard";

function ShowProducts(props) {
  const [currentPage, setCurrentPage] = useState(1);

  const productList = useSelector((state) => state.productList);
  const category = props.category;
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category));
  }, [category]);

  const productsPerPage = 16;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleChangePage = function (event, page) {
    setCurrentPage(page);
  };

  const product = () => {
    return (
      <>
        {currentProducts.map((product) => {
          return <ProductsCard product={product} key={product._id} />;
        })}
      </>
    );
  };
  return loading ? (
    <div className="d-flex justify-content-center">
      <span style={{ color: "Tomate" }}>
        <i className="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
      </span>
    </div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="container">
      <div className="row d-flex justify-content-center mb-5">{product()}</div>
      <div className="d-flex justify-content-center">
        <Pagination
          count={totalPages}
          variant="outlined"
          color="secondary"
          page={currentPage}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default ShowProducts;
