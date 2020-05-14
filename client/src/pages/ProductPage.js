import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import { Title, Slideshow, ButtonSymbol, Label, ButtonWord } from '../components/UtilityComponents';
import { FlexContainer } from '../components/ContainerComponents';

function ProductPage(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));

  }, []);


  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
  }
  function myFunction(e) {
    console.log(e.target.src)
    var expandImg = document.getElementById("expandedImg");
    expandImg.src = e.target.src;
    // expandImg.setAttribute("src", [imgs.src])
    expandImg.parentElement.style.display = "block";
  }

  return <div>
    <div className="back-to-result">
      <Link to="/allproducts"><ButtonWord styles={{ fontSize: 20, fontFamily: "logo_font" }} >Back to Results</ButtonWord></Link>
    </div>
    {loading ? <Title styles={{ fontSize: 20, fontFamily: "logo_font" }} >Loading...</Title> :
      error ? <div>{error} </div> :
        (
          <div className="details">
            <div className="details-image">
              <img id="expandedImg" alt="" src={product.image_1} style={{ maxWidth: "400px", maxHeight: "400px", height: "100%", width: "100%" }} />
            </div>
            <div className="details-info">
              <Title styles={{ fontSize: 30, fontFamily: "logo_font", marginTop: 0 }} >{product.name}</Title>
              <FlexContainer styles={{ marginBottom: "10px" }}>
                <Label styles={{ fontSize: 20, fontFamily: "logo_font", marginRight: 5 }} >Price: </Label>
                <Label>${product.price ? product.price.toFixed(2) : product.price}</Label>
              </FlexContainer>
              <FlexContainer styles={{ flexDirection: "column", alignContent: "space-between" }}>
                <FlexContainer styles={{ flexDirection: "column", height: "100%" }}>
                  <Label styles={{ fontSize: 20, fontFamily: "logo_font", marginRight: 5 }} > Description: </Label>
                  <div>
                    <ul style={{ marginLeft: "10px" }}>
                      {product.description ? product.description.split("\n").map(line => {
                        return (
                          <li style={{ listStyleType: "disc" }}>
                            {line}
                          </li>
                        )
                      })
                        : product.description}
                    </ul>
                  </div>
                </FlexContainer>
                <div className="details-image">
                  {
                    [product.image_1, product.image_2, product.image_3, product.image_4].map((image, index) => {
                      return (
                        <div className="column" key={index}>
                          <img src={image} alt="" style={{ width: "100%" }} onClick={(e) => myFunction(e)} />
                        </div>
                      )
                    }
                    )
                  }
                </div>
              </FlexContainer>
            </div>
            <div className="details-action">
              <ul>
                <li>
                  Price: {product.price}
                </li>
                <li>
                  Status: {product.countInStock > 0 ? "In Stock" : "Unavailable."}
                </li>
                <li>
                  Qty: <select defaultValue={qty} onChange={(e) => { setQty(e.target.value) }}>
                    {[...Array(product.countInStock).keys()].map(x =>
                      <option key={x + 1} defaultValue={x + 1}>{x + 1}</option>
                    )}
                  </select>
                </li>
                <li>
                  {product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary" >Add to Cart</button>
                  }
                </li>
              </ul>
            </div>
          </div>
        )
    }


  </div>
}
export default ProductPage;