import React, {useState}from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Input from '../../components/UI/frominput';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signup } from '../../actions/user.actions';


const Signup = () => {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[error,setError] = useState('');
    
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);

    const Register = async(e) => {
        e.preventDefault();
        const user = {
            firstName,
            lastName,
            email,
            password,
        };
        try {
            await dispatch(signup(user));
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    


    if(auth.authenticate) {
        return <Navigate to={'/'}/>
    }
    if(user.loading){
        return <p>Loading...!</p>
    }
    if(user.message){
        return <p>{user.message}</p>
    }

  return (
    <Layout>
            <Container>
            {error && <p style={{ color: 'red' }}>{error}</p>}
                <Row style={{ marginTop: 50 }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={Register}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        type="text"
                                        placeholder="Enter First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label="Last Name"
                                        type="text"
                                        placeholder="Enter Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Input
                                label="Eamil"
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="Password"
                                type="text"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
  )
}

export default Signup