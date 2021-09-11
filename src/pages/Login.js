import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/authMutations';
import Auth from '../utils/auth';

function Login(props) {
    const [formState, setFormState] = useState ({ username: '', password: ''});
    const [login, {error}] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login ({
                variables: {email: formState.username, password: formState.password},
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (err) {
            console.log(err);
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className="container">
            <Link to="/signup">Register for account</Link>

            <h1>Login</h1>
            <form onSubmit={handleFormSubmit}>
                <div class="container">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required onChange={handleChange}/>
                </div>
                <div>
                    <label for="psw"><b>Password</b></label>
                     <input type="password" placeholder="Enter Password" name="psw" required onChange={handleChange}/>
                </div>
                {error ? (
                    <div> 
                        <p className="error-text">Username or password incorrect, try again!</p>
                    </div>
                ) : null}
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;