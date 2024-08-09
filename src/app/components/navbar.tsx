import React from 'react';
import logoImg from '../../assets/images/logo.jpg';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/index.css";
import Link from 'next/link';

interface NavbarProps {
    isAdmin: boolean;
}

const Navbar = ({ isAdmin }: NavbarProps) => {
    return <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-custom">
        <div className="container-fluid">
            <a className="navbar-brand" href={isAdmin ? "/admin/" : "/"}>
                <Image src={logoImg} alt="Bootstrap" width="70" height="30" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href={isAdmin ? "/admin/" : "/"}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href={isAdmin ? "/admin/orders" : "/orders"}>Orders</a>
                    </li>
                    {isAdmin &&
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/admin/users">Users</Link>
                        </li>
                        // :
                        // <li className="nav-item">
                        //     <a className="nav-link active" aria-current="page" href="/cart">Cart</a>
                        // </li>
                    }
                </ul>
                <form className="d-flex">
                    <button className="btn btn-outline-success" type="button" onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }}>Sign out</button>
                </form>
            </div>
        </div>
    </nav>
}

export default Navbar;
