import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import banner from '../img/banner.jpg';

export default function MainContainer() {
    return (
        <>
            <main className="container">
                <div className="row">
                    <div className="col">
                        <div className="banner">
                            <img src={banner} className="img-fluid" alt="К весне готовы!" />
                            <h2 className="banner-header">К весне готовы!</h2>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}