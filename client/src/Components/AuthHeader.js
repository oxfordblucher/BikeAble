import React, { useContext } from "react";
import { AuthContext } from "../context";
export const Authentication = () => {
    const authContext = useContext(AuthContext);
    const loginHandler = () => {
        authContext.login();
    };
    const logoutHandler = () => {
        authContext.logout();
    };
    return (
        <>
            {!authContext.isLoggedIn && (
                <button className="login" onClick={loginHandler}>
                    Login
                </button>
            )}
            {authContext.isLoggedIn && (
                <button className="login" onClick={logoutHandler}>
                    Logout
                </button>
            )}
        </>
    );
};