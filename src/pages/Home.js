import React from "react";
import Login from "./Login";
import Signup from "./Signup";

const Home = () => {
    return (
        <div className="container">
            <Login />
            <Signup />
        </div>
    );
};

export default Home;
