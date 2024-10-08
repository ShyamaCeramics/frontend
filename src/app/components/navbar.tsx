import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/index.css";
import logoImg from '../../assets/images/logo.jpg';
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import UpdateUserDetails from '../modals/update-ser-details';

interface NavbarProps {
    isAdmin: boolean;
}

const Navbar = ({ isAdmin }: NavbarProps) => {
    return <>
        <UpdateUserDetails />
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-custom">
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
                    <form style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', width: '130px', justifyContent: 'space-between', marginRight: '20px' }}>
                            <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                                <FaInstagramSquare style={{ fontSize: '28px', color: '#E4405F' }} />
                            </a>
                            <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
                                <FaFacebookSquare style={{ fontSize: '28px', color: '#3b5998' }} />
                            </a>
                            <a href="https://www.google.com/maps/search/?api=1&query=your+business+address" target="_blank" rel="noopener noreferrer">
                                <FaLocationDot style={{ fontSize: '28px', color: '#FF0000' }} />
                            </a>
                            <span>
                                <IoSettings
                                    style={{ fontSize: '28px', color: 'grey' }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#update-user-details-modal"
                                />
                            </span>
                        </div>
                        <button className="btn btn-outline-success" type="button" onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}>Sign out</button>
                    </form>
                </div>
            </div>
        </nav>
    </>
}

export default Navbar;
