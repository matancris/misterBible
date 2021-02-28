import React from 'react'
import { Link } from 'react-router-dom'

export default function AppHeader() {
    return (
        <section className="app-header main-container full">
            <div className="header-wrapper flex space-between">
                <div className="logo">misterBible</div>
                <nav className="main-nav">
                    <ul className="clean-list flex">
                        <li><Link to="/">home</Link></li>|
                        <li><Link to="/about">about</Link></li>
                    </ul>
                </nav>

            </div>
        </section>
    )
}
