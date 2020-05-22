import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Product, Search, Sort } from '../components/SpecialtyComponents/index'
import { FlexContainer } from '../components/ContainerComponents/index'
import { Title } from "../components/UtilityComponents/index"

function AllProductsPage(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(""));
  }, []);


  useEffect(() => {
    dispatch(listProducts(category));
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }

  return <>
    <FlexContainer h_center>
      <Title styles={{ fontSize: 40 }} class="h1_title" >{category || "All Products"}</Title>
    </FlexContainer>
    <Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} />
    <FlexContainer h_center>

      {/* <Sort sortHandler={sortHandler} /> */}
    </FlexContainer>
    {loading ?
      <FlexContainer h_center>
        <Title styles={{ fontSize: 20 }} >Loading...</Title>
      </FlexContainer>
      :
      error ?
        <FlexContainer h_center>
          <Title styles={{ fontSize: 20 }} >{error}</Title>
        </FlexContainer>
        :
        <ul className="products">
          {
            products.map((product, index) =>
              <Product key={index} product={product} />
            )
          }
        </ul>
    }
  </>

}
export default AllProductsPage;