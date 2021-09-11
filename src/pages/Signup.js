import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/authMutations';
import Auth from '../utils/auth';

function Signup(props) {
    const [formState, setFormState] = useState({ username: '', password: ''});
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    const mutationResponse = await addUser({
        variables: {
            username: formState.username, 
            password: formState.password,
        },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
    };
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };
    return(
        <div className="container">
            <Link to="/login">Go to Login</Link>
        <h1>Sign Up</h1>

        <form onSubmit={handleFormSubmit} action="action_page.php" style="border:1px solid #ccc">
        <div class="container">
            <p>Please fill in this form to create an account.</p>
            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter username" name="uname" required onChange={handleChange}/>
        </div>
        <div class="container">
            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required onChange={handleChange}/>
        </div>
        <div class="container">
            <label for="psw-repeat"><b>Repeat Password</b></label>
             <input type="password" placeholder="Repeat Password" name="psw-repeat" required onChange={handleChange}/>
        </div>
         <div class="clearfix">
            <button type="submit" class="signupbtn">Sign Up</button>
        </div>
        </form>
        </div>
    );
}

export default Signup;