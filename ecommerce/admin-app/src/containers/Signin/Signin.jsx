import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Input from '../../components/UI/frominput';
import { login} from '../../actions';
import {  useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Signin = () => {

    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[erro,setError] = useState('');

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onLogin = (e) => {
        e.preventDefault();
        const user = {
            email,password
        }
        dispatch(login(user));
    }
    if(auth.authenticate) {
        return <Navigate to={'/'}/>
    }
    

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: 50 }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={onLogin}>
                            <Input
                                label="Eamil"
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="Password"
                                type="password"
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

export default Signin;