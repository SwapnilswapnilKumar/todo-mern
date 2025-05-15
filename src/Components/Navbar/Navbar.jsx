import React from 'react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {

    const logOut = ()=>{
        localStorage.removeItem('auth-token');
        window.location.replace('/');
    }

    return (
        <nav className="flex justify-around bg-slate-700 text-white py-2">
            <div className="logo">
                <span className="font-bold text-xl mx-8">Todo</span>
            </div>
            <ul className="flex gap-8 mx-9">
                <Link to="/"><li className="cursor-pointer hover:font-bold transition-all">Home</li></Link>
                <Link to="/yourtask"><li className="cursor-pointer hover:font-bold transition-all">Your tasks</li></Link>
                <Link to="/login">
                {localStorage.getItem('auth-token')?<li className="cursor-pointer hover:font-bold transition-all font-bold" onClick={logOut} >Log out</li>:
                    <li className="cursor-pointer hover:font-bold transition-all font-bold">Login</li>
                }
                
                </Link>
            </ul>
        </nav>
    );
};

export default Navbar;
