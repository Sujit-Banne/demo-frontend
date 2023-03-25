import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

import Form from '../Form';
import '../form.css';

function SignIn() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (firstName !== '' && lastName !== '' && email !== '' && password !== '' && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            axios.post('/api/signUp', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }).then(res => {
                console.log(res);
                localStorage.setItem('userTokenTime', new Date());
                navigate('/');
            }).catch(err => {
                console.log(err);
                setError('Failed to sign up. Please try again.');
            });
        } else {
            setError('Please enter valid details.');
        } 
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <h3 className="text-center text-info">Register</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
                <label htmlFor="first-name" className="text-info">First Name:</label><br />
                <input
                    id="first-name"
                    className="form-control"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required />
            </div>
            <div className="form-group">
                <label htmlFor="last-name" className="text-info">Last Name:</label><br />
                <input
                    id="last-name"
                    className="form-control"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required />
            </div>
            <div className="form-group">
                <label htmlFor="email" className="text-info">Email:</label><br />
                <input
                    id="email"
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="example@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="text-info">Password:</label><br />
                <input
                    id="password"
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
            </div>
            <div className="d-flex justify-content-between align-items-end">
                <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
                <Link to="/signIn" className="text-info">Login here</Link>
            </div>
        </Form>
    )
}

export default SignIn
