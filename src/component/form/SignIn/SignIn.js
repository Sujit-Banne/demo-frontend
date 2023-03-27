import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Form from '../Form';
import '../form.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmitHandler = (event) => {
        event.preventDefault(); // add this line to prevent page refresh

        if (
            email.trim() !== '' &&
            password.trim() !== '' &&
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        ) {
            axios
                .post('/api/signin', {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    console.log(res);
                    setToken(res.data.token);
                    const data = {
                        token: res.data.token, // update the token here
                        time: new Date().getTime(),
                    };
                    localStorage.setItem('userTokenTime', JSON.stringify(data));
                    localStorage.setItem('uploader_name', res.data.user[0].name);
                    console.log(res.data.user[0].name);
                    navigate('/home');
                })
                .catch((err) => {
                    console.log(err);
                    setError('Invalid credentials. Please try again.');
                });

        } else {
            setError('Please enter valid details');
        }
    };

    const onEmailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const onPasswordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <h3 className="text-center text-info">Login</h3>
            <div className="form-group">
                <label htmlFor="email" className="text-info">
                    Email:
                </label>
                <br />
                <input
                    id="email"
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="example@domain.com"
                    onChange={onEmailChangeHandler}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="text-info">
                    Password:
                </label>
                <br />
                <input
                    id="password"
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="********"
                    onChange={onPasswordChangeHandler}
                    required
                />
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            <div className="d-flex justify-content-between align-items-end">
                <button className="btn btn-info btn-md" type="submit">
                    Submit
                </button>
                <Link to="/signUp" className="text-info">
                    Sign Up here
                </Link>
            </div>
        </Form>
    );
};

export default SignIn;
