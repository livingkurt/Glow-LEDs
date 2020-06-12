import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';
import { Title, ButtonSymbol } from '../components/UtilityComponents';
import { FlexContainer, BlockContainer } from '../components/ContainerComponents';

function ProductsPage(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image_1, setImage_1] = useState('');
  const [image_2, setImage_2] = useState('');
  const [image_3, setImage_3] = useState('');
  const [image_4, setImage_4] = useState('');
  const [video, setVideo] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [facts, setFacts] = useState('');
  const productList = useSelector(state => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());

  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setFacts(product.facts);
    setImage_1(product.image_1);
    setImage_2(product.image_2);
    setImage_3(product.image_3);
    setImage_4(product.image_4);
    setVideo(product.video);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({
      _id: id,
      name, price, image_1, image_2, image_3, image_4, video, brand, category,
      countInStock, facts, description
    }));
  }
  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  }


  return <BlockContainer class="main_container">
    <div className="product-header">
      <Title styles={{ fontSize: 30, textAlign: "center", width: "89%", marginRight: "auto" }} >Products</Title>
      <button className="button primary" style={{ width: "156px" }} onClick={() => openModal({})}>Create Product</button>
    </div>
    {modalVisible &&
      <div className="form">
        <form onSubmit={submitHandler} style={{ width: "100%" }} >
          <ul className="form-container" style={{ maxWidth: "64rem", marginBottom: "20px" }}>
            <Title styles={{ fontSize: 30 }} >Create Product</Title>
            <li>
              <FlexContainer h_center>
                {loadingSave && <Title styles={{ fontSize: 20 }} >Loading...</Title>}
                {errorSave && <Title styles={{ fontSize: 20 }} >{errorSave}</Title>}
              </FlexContainer>
            </li>
            <FlexContainer row>
              <FlexContainer column styles={{ width: "50%", marginRight: "10px" }}>
                <li>
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" defaultValue={name} id="name" onChange={(e) => setName(e.target.value)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="price">Price</label>
                  <input type="text" name="price" defaultValue={price} id="price" onChange={(e) => setPrice(e.target.value)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="image">Image 1</label>
                  <input type="text" name="image_1" defaultValue={image_1} id="image_1" onChange={(e) => setImage_1(e.target.value)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="image">Image 2</label>
                  <input type="text" name="image_2" defaultValue={image_2} id="image_2" onChange={(e) => setImage_2(e.target.value)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="image">Image 3</label>
                  <input type="text" name="image_3" defaultValue={image_3} id="image_3" onChange={(e) => setImage_3(e.target.value)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="image">Image 4</label>
                  <input type="text" name="image_4" defaultValue={image_4} id="image_4" onChange={(e) => setImage_4(e.target.value)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="video">Video</label>
                  <input type="text" name="video" defaultValue={video} id="video" onChange={(e) => setVideo(e.target.value)}>
                  </input>
                </li>
              </FlexContainer>
              <FlexContainer column styles={{ width: "50%", marginLeft: "10px" }}>
                <li>
                  <label htmlFor="brand">Brand</label>
                  <input type="text" name="brand" defaultValue={brand} id="brand" onChange={(e) => setBrand(e.target.value)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="countInStock">Count In Stock</label>
                  <input type="text" name="countInStock" defaultValue={countInStock} id="countInStock" onChange={(e) => setCountInStock(e.target.value)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="name">Category</label>
                  <input type="text" name="category" defaultValue={category} id="category" onChange={(e) => setCategory(e.target.value)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="facts">Facts</label>
                  <textarea name="facts" defaultValue={facts} id="facts" onChange={(e) => setFacts(e.target.value)}></textarea>
                </li>
                <li>
                  <label htmlFor="description">Description</label>
                  <textarea name="description" defaultValue={description} style={{ height: "118px" }} id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
                </li>
              </FlexContainer>
            </FlexContainer>
            <li>
              <button type="submit" className="button primary">{id ? "Update" : "Create"}</button>
            </li>
            <li>
              <button type="button" onClick={() => setModalVisible(false)} className="button secondary">Back</button>
            </li>
          </ul>
        </form>
      </div>
    }


    <div className="product-list" style={{ overflowX: "auto" }}>

      <table className="table responsive_table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (<tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>{product.category}</td>
            <td>{product.brand}</td>
            <td>
              <FlexContainer h_between>
                <ButtonSymbol arg={product} on_click_function={openModal} ><i className="fas fa-edit"></i></ButtonSymbol>
                <ButtonSymbol arg={product} on_click_function={deleteHandler} ><i className="fas fa-trash-alt"></i></ButtonSymbol>
              </FlexContainer>
            </td>
          </tr>))}
        </tbody>
      </table>

    </div>
  </BlockContainer>
}
export default ProductsPage;