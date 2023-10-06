import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../actions';
import Input from '../../components/UI/frominput'
import Model from '../../components/UI/Model/model';

const Category = (props) => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categoryName, setCategoryName] = useState('');
  const [parentId, setParentId] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);




  const handleSubmit = () => {
    const form = new FormData();
    form.append('name', categoryName);
    form.append('categoryImage', categoryImage);
    form.append('parentId', parentId);
    dispatch(addCategory(form));

    setCategoryName('');
    setCategoryImage(null);
    setParentId('');
    setShow(false);
  }

  const renderCategory = (categories) => {
    if (!categories || categories.length === 0) {
      return null; // Handle the case where categories are empty or not available
    }

    return categories.map((category) => (
      <li key={category.name}>
        {category.name}
        {category.children && category.children.length > 0 ? (
          <ul>{renderCategory(category.children)}</ul>
        ) : null}
      </li>
    ));
  };


  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name })
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  }

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  }
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Category</h3>
              <Button onClick={handleShow}>Add New</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>{renderCategory(category.categories)}</ul>
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
          value={categoryName}
          placeholder='Enter Categroy Name'
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select className='form-control' value={parentId} onChange={(e) => setParentId(e.target.value)}>
          <option>Select Category</option>
          {
            createCategoryList(category.categories).map(option => (
              <option key={option.value} value={option.value}>{option.name}</option>
            ))
          }
        </select> <br />
        <input type='file' name='categoryImage' onChange={handleCategoryImage} className='form-control' />
      </Model>

    </Layout>
  );
};

export default Category;
