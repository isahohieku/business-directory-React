import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <nav className="bg-primary2 py-4">
            <div className="container-fluid">
                <div className="row">
                    <div className="col d-flex justify-content-between">
                        <h5>Business Directory</h5>

                        <Link to="/login" className="text-light">Admin</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}