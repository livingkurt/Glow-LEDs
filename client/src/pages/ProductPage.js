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
    const video = document.getElementsByClassName("product_video")
    video.muted = true
    video.autoplay = true
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
      <Link to="/allproducts"><Title styles={{ fontSize: "2rem" }} >Back to Results</Title></Link>
    </div>
    {loading ? <Title styles={{ fontSize: "2rem" }} >Loading...</Title> :
      error ? <div>{error} </div> :
        (
          <div>
            <div className="details">
              <FlexContainer column>
                <Title class="product_title_top" styles={{ display: "none", fontSize: "4rem", marginBottom: 20 }} >{product.name}</Title>
                <div className="details-image">
                  <img id="expandedImg" alt="" src={product.image_1} style={{ maxWidth: "400px", maxHeight: "400px", height: "100%", width: "100%" }} />
                </div>
              </FlexContainer>
              <div className="details-info">
                <Title class="product_title_side" styles={{ display: "flex", fontSize: "3rem", marginBottom: 20 }} >{product.name}</Title>
                <FlexContainer>
                  <Title styles={{ fontSize: "2rem", margin: 0, marginRight: 5, }} >Price: </Title>
                  <Label styles={{ fontSize: "2rem" }} >${product.price ? product.price.toFixed(2) : product.price}</Label>
                </FlexContainer>
                <FlexContainer column  >
                  <FlexContainer column styles={{ height: "100%" }}>
                    <div>
                      <ul style={{ marginLeft: "10px" }}>
                        {product.facts ? product.facts.split("\n").map((line, index) => {
                          return (
                            <li key={index} style={{ listStyleType: "disc" }}>
                              {line}
                            </li>
                          )
                        })
                          : product.facts}
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
                    Price: ${product.price ? product.price.toFixed(2) : product.price}
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
            <div>
              <FlexContainer column styles={{ padding: "1rem" }}>
                <Title styles={{ fontSize: 20, margin: 0, marginRight: 5 }} > Description: </Title>
                <p>{product.description}</p>

                {!product.video ?

                  <Title styles={{ fontSize: 30, textAlign: "center", width: "100%" }} >Video Coming Soon!</Title>
                  : <FlexContainer h_center column >
                    <p style={{ textAlign: "center" }}>
                      Watch the Video Below to Learn More
                  </p>
                    <video className="product_video" style={{ height: "auto", maxWidth: "100%", borderRadius: "20px" }} controls>
                      <source src={product.video} type="video/mp4" />
                    </video>
                  </FlexContainer>}
                {/* <Title styles={{ fontSize: 30, textAlign: "center", width: "100%" }} >{product.name}</Title> */}
              </FlexContainer>

            </div>
          </div>

        )
    }


  </div>
}
export default ProductPage;