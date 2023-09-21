import React from 'react';

export const Navbar = () => {
    return (
        <div id="nav-bar">
            <input id="nav-toggle" type="checkbox" />
            <div id="nav-header">
                <a id="nav-title" href="https://codepen.io" target="_blank">
                    C<i className="fab fa-codepen"></i>DEPEN
                </a>
                <label htmlFor="nav-toggle">
                    <span id="nav-toggle-burger"></span>
                </label>
                <hr />
            </div>
            <div id="nav-content">
                <div className="nav-button">
                    <i className="fas fa-palette"></i><span>Your Work</span>
                </div>
                <div className="nav-button">
                    <i className="fas fa-images"></i><span>Assets</span>
                </div>
                <div className="nav-button">
                    <i className="fas fa-thumbtack"></i><span>Pinned Items</span>
                </div>
                <hr />
                <div className="nav-button">
                    <i className="fas fa-heart"></i><span>Following</span>
                </div>
                <div className="nav-button">
                    <i className="fas fa-chart-line"></i><span>Trending</span>
                </div>
                <div className="nav-button">
                    <i className="fas fa-fire"></i><span>Challenges</span>
                </div>
                <div className="nav-button">
                    <i className="fas fa-magic"></i><span>Spark</span>
                </div>
                <hr />
                <div className="nav-button">
                    <i className="fas fa-gem"></i><span>Codepen Pro</span>
                </div>
                <div id="nav-content-highlight"></div>
            </div>
            <input id="nav-footer-toggle" type="checkbox" />
            <div id="nav-footer">
                <div id="nav-footer-heading">
                    <div id="nav-footer-avatar">
                        <img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" alt="Avatar" />
                    </div>
                    <div id="nav-footer-titlebox">
                        <a id="nav-footer-title" href="https://codepen.io/uahnbu/pens/public" target="_blank">
                            uahnbu
                        </a>
                        <span id="nav-footer-subtitle">Admin</span>
                    </div>
                    <label htmlFor="nav-footer-toggle">
                        <i className="fas fa-caret-up"></i>
                    </label>
                </div>
                <div id="nav-footer-content">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
        </div>
    );
};
