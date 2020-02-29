import React from 'react';

export default function Footer() {
    return (
        <footer>
            <div className="container-fluid mt-2 pt-2">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <nav>
                            <ul className="d-flex justify-content-between justify-content-md-start">
                                <li className="d-inline-block px-2"><a href="https://www.linkedin.com/in/isah-ohieku-b982a6164"
                                    className="text-primary2" target="_blank" rel="noreferrer noopener"><i className="fab fa-linkedin-in fa-3x"></i></a></li>
                                <li className="d-inline-block px-2"><a href="https://www.github.com/isahohieku" className="text-primary2"
                                    target="_blank" rel="noreferrer noopener"><i className="fab fa-github fa-3x"></i></a></li>
                                <li className="d-inline-block px-2"><a href="https://www.dribbble.com/isahohieku" className="text-primary2"
                                    target="_blank" rel="noreferrer noopener"><i className="fab fa-dribbble fa-3x"></i></a></li>
                                <li className="d-inline-block px-2"><a href="https://www.behance.net/isahohiekufa98" className="text-primary2"
                                    target="_blank" rel="noreferrer noopener"><i className="fab fa-behance fa-3x"></i></a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-center align-items-center justify-content-md-end">
                            <h5 className="pr-2 text-primary2">&copy; {new Date().getFullYear()} Isah Ohieku - Business Directory</h5>
                    </div>
                </div>
            </div>
        </footer>
    );
}