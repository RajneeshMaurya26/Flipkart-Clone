import React,{ useState} from 'react';
import Layout from '../../components/Layout';
import { Col, Container, Row,Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/UI/frominput'
import { addProduct } from '../../actions';
import Model from '../../components/UI/Model/model'

const Product = (props) => {

  const category = useSelector(state => state.category);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name,setName] = useState('');
  const [price,setPrice] = useState('');
  const [quantity,setQuantity] = useState('');
  const [description,setDescription] = useState('');
  const [categoryId,setCategoryId] = useState('');
  const [productImage,setProductImage] = useState([]);

  const handleSubmit = () => {
    const form = new FormData();
    form.append('name',name);
    form.append('price',price);
    form.append('quantity',quantity);
    form.append('description',description);
    form.append('category',categoryId);
    for(let picture of productImage){
      form.append('productPictures',picture);
    }
    dispatch(addProduct(form));
    setName('');
    setPrice('');
    setQuantity('');
    setDescription('');
    setCategoryId('');
    setProductImage([]);
    setShow(false);
  }

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name })
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  }
  
  const handleProductImage = (e) => {
    const files = e.target.files;
    const selectedImages = [];
  
    // Loop through the selected files and add them to the array
    for (let i = 0; i < files.length; i++) {
      selectedImages.push(files[i]);
    }
  
    // Update the state with the selected images
    setProductImage([...productImage, ...selectedImages]);
  }
  
  // Single select image
  // const handleProductImage = (e) => {
  //   setProductImage([
  //     ...productImage,
  //     e.target.files[0]
  //   ]);
  // }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Product</h3>
              <Button onClick={handleShow}>Add New</Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Model
        show={show}
        onhide={handleClose}
        ModelTitle={'Add Category'}
        handleSubmit = {handleSubmit}
        handleClose={handleClose}
      >
        <Input
            value={name}
            placeholder='Enter Product Name'
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            value={price}
            placeholder='Enter Price Name'
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            value={quantity}
            placeholder='Enter Quantity'
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            value={description}
            placeholder='Enter Quantity'
            onChange={(e) => setDescription(e.target.value)}
          />
          <select className='form-control' value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option>Select Category</option>
            {
              createCategoryList(category.categories).map(option => (
                <option key={option.value} value={option.value}>{option.name}</option>
              ))
            }
          </select> <br />
          {
            productImage.length > 0 ?
            productImage.map((pic,index) => <div key={index}>{pic.name}</div>):null
          }
          <input type='file' name='categoryImage' onChange={handleProductImage} className='form-control' />
      </Model>
    </Layout>
  )
}

export default Product