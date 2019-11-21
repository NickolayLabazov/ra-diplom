import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import banner from '../img/banner.jpg';



export default function MainContainer() {
    return (
        <>
            <main className="container">
        <div className="row">
            <div className="col">              

                <section className="top-sales">
                    <h2 className="text-center">Хиты продаж!</h2>

                    <div className="preloader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </section>

                <section className="catalog">
                    <h2 className="text-center">Каталог</h2>

                    <div className="preloader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </section>

            </div>
        </div>
    </main>
        </>
    );
}