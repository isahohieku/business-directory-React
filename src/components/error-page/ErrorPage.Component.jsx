import React from 'react';
import { Link } from 'react-router-dom';
import favicon from '../../img/lion.png';

export default function ErrorPage() {

    return (
        <React.Fragment>
            {/* Wrapper div */}
            <div className="d-flex position-relative">
                <div className="left w-50" style={styles.full_height}></div>
                <div className="right w-50"></div>
                <div className="container position-absolute" style={styles.center_screen}>
                    <div className="row">
                        <div className="col d-flex align-items-center justify-content-center" style={styles.inner_height}>
                            <div>
                                {/* Favicon */}
                                <div className="mx-auto">
                                    <Link to="/"><img src={favicon} alt='favicon' width="150" /></Link>
                                </div>
                                <h1 className="text-light font-weight-light mb-5">Ops! Sorry we can't find the page you're looking for.</h1>
                            </div>
                        </div>
                        <div className='col d-flex align-items-center justify-content-center'>
                            <div>
                                <h1 className="font-weight-light" style={styles.text_primary}>404</h1>
                                <Link to="/"><button className="btn bg-primary-2 text-light px-4" style={styles.drop_shadow}>Go back home</button></Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
}

const styles = {
    full_height: {
        height: '100vh',
        backgroundColor: '#434f80'
    },
    inner_height: {
        height: '75vh',
        backgroundColor: '#434f80'
    },
    center_screen: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        'boxShadow': '0px 13px 38px -7px rgba(0,0,0,0.58)'
    },
    text_primary: {
        color: '#434f80',
        fontSize: 180
    },
    drop_shadow: {
        boxShadow: '0px 13px 38px -7px rgba(0,0,0,0.58)'
    }

}