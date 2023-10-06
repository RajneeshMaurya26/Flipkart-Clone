import React from 'react'
import {Container,Nav,Navbar} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import { signout } from '../../actions';

const Header = () => {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  }

  const loggedInUser = () =>{
    return(
      <Nav>
            <li className='nav-item'>
                <NavLink to="/signin" className='nav-link' onClick={() => logout()}>Logout</NavLink>
            </li>
          </Nav>
    )
  }
  const notloggedInUser = () =>{
    return(
      <Nav>
            {/* <Nav.Link href="#deets">Login</Nav.Link> */}
            <li className='nav-item'>
                <NavLink to="/signin" className='nav-link'>Signin</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink to="/signup" className='nav-link'>Signup</NavLink>
            </li>
          </Nav>
    )
  }



  return (
    <>
    <Navbar collapseOnSelect fixed='top' expand="lg" bg='dark' variant='dark' style={{zIndex:1}}>
      <Container fluid>
        {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
        <Link to="/" className='navbar-brand'>Admin Dashborad</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {
            auth.authenticate?loggedInUser():notloggedInUser()
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header;