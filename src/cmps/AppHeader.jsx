import React from 'react'

export default function AppHeader() {
    return (
        <section className="app-header main-container full">
            <div className="header-wrapper flex space-between">
                <div className="logo">LOGO</div>
                <nav className="main-nav">
                    <ul className="clean-list flex">
                        <li><a href="#">Link1</a></li>|
                        <li><a href="#">Link2</a></li>|
                        <li><a href="#">Link3</a></li>
                    </ul>
                </nav>

            </div>
        </section>
    )
}
