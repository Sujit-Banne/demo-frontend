// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios';

// import Form from '../Form';
// import '../form.css';

// function SignIn() {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const onSubmitHandler = (e) => {
//         e.preventDefault();
//         if (firstName !== '' && lastName !== '' && email !== '' && password !== '' && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
//             axios.post('/api/signup', {
//                 firstName: firstName,
//                 lastName: lastName,
//                 email: email,
//                 password: password
//             }).then(res => {
//                 console.log(res);
//                 localStorage.setItem('userTokenTime', new Date());
//                 navigate('/');
//             }).catch(err => {
//                 console.log(err);
//                 setError('Failed to sign up. Please try again.');
//             });
//         } else {
//             setError('Please enter valid details.');
//         }
//     }

//     return (
//         <Form onSubmit={onSubmitHandler}>
//             <h3 className="text-center text-info">Register</h3>
//             {error && <div className="alert alert-danger">{error}</div>}
//             <div className="form-group">
//                 <label htmlFor="first-name" className="text-info">First Name:</label><br />
//                 <input
//                     id="first-name"
//                     className="form-control"
//                     type="text"
//                     name="firstName"
//                     placeholder="First Name"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     required />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="last-name" className="text-info">Last Name:</label><br />
//                 <input
//                     id="last-name"
//                     className="form-control"
//                     type="text"
//                     name="lastName"
//                     placeholder="Last Name"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     required />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="email" className="text-info">Email:</label><br />
//                 <input
//                     id="email"
//                     className="form-control"
//                     type="email"
//                     name="email"
//                     placeholder="example@domain.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="password" className="text-info">Password:</label><br />
//                 <input
//                     id="password"
//                     className="form-control"
//                     type="password"
//                     name="password"
//                     placeholder="********"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required />
//             </div>
//             <div className="d-flex justify-content-between align-items-end">
//                 <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
//                 <Link to="/signin" className="text-info">Login here</Link>
//             </div>
//         </Form>
//     )
// }

// export default SignIn


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [profession, setProfession] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('/api/signup', {
                name,
                email,
                password,
                phone,
                profession,
            });
            if (response.status === 201) {
                navigate('/');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="profession">Profession:</label>
                    <input
                        type="text"
                        id="profession"
                        value={profession}
                        onChange={(event) => setProfession(event.target.value)}
                        required
                    />
                </div>
                {error && <div>{error}</div>}
                <button type="submit">Signup</button>
                <div className="login button">
                    <Link to="/signin" className="text-info">Login here</Link>
                </div>
            </form>
        </div>
    );
};


export default Signup;


