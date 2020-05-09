import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Product, Search, Sort } from '../components/SpecialtyComponents/index'
import { FlexContainer } from '../components/ContainerComponents/index'
import { Title, Label, ButtonWord } from "../components/UtilityComponents/index"

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
    <FlexContainer styles={{ justifyContent: "center" }}>
      <Title styles={{ fontSize: 40, fontFamily: "logo_font" }} >{category || "All Products"}</Title>
    </FlexContainer>
    <FlexContainer styles={{ justifyContent: "center" }}>
      <Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} />
      <Sort sortHandler={sortHandler} />
    </FlexContainer>
    {loading ? <div>Loading...</div> :
      error ? <div>{error}</div> :
        <ul className="products">
          {
            products.map(product =>
              <Product product={product} />
            )
          }
        </ul>
    }
  </>

}
export default AllProductsPage;