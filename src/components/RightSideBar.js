import React, { useEffect } from 'react';
import { MiniBar } from 'minibarjs';
import { useHistory } from 'react-router-dom';

const RightSideBar = (props) => {
    const history = useHistory();

    const navigate = (event) => {
        event.preventDefault()
    }
    const scrollbars = document.querySelectorAll('.scroll-bar');
    scrollbars.forEach(each => {
        new MiniBar(each,
            {
                barType: "default",
                minBarSize: 10,
                hideBars: false
            }
        )
    })

    const getGroupDetaills = (event) => {
        event.preventDefault();
        history.push('/create-group-join');

    }
    const rightSide = props.rightSide ? props.rightSide : false;
    if(!rightSide) return null;

    return (
        <div className="right-sidebar-wrapper position-fixed d-none d-lg-block">
            <div className="sidebar-inner scroll-bar">
                <div className="shadow-gurd">
                    <div className="cmn-card shadow-gray-point-2 mb-4">
                        <div className="groups-wrapper">
                            <h4 className="cmn-card-title">Suggestions for you</h4>
                            <div className="single-group">
                                <div className="gp-icon"><img src="img/gp-1.jpg" alt="" /></div>
                                <div className="gp-text">Abi_00056</div>
                                <div className="gp-button">
                                    <a href="/" onClick={(event) => getGroupDetaills(event)} className="btn border border-primary follow">View</a>
                                </div>
                            </div>
                            <div className="single-group">
                                <div className="gp-icon"><img src="img/gp-1.jpg" alt="" /></div>
                                <div className="gp-text">Abi_00056</div>
                                <div className="gp-button">
                                    <a href="/" onClick={(event) => getGroupDetaills(event)} className="btn border border-primary follow">View</a>
                                </div>
                            </div>
                            <div className="single-group">
                                <div className="gp-icon"><img src="img/gp-1.jpg" alt="" /></div>
                                <div className="gp-text">Abi_00056</div>
                                <div className="gp-button">
                                    <a href="/" onClick={(event) => getGroupDetaills(event)} className="btn border border-primary follow">View</a>
                                </div>
                            </div>
                            <div className="single-group">
                                <div className="gp-icon"><img src="img/gp-1.jpg" alt="" /></div>
                                <div className="gp-text">Abi_00056</div>
                                <div className="gp-button">
                                    <a href="/" onClick={(event) => getGroupDetaills(event)} className="btn border border-primary follow">View</a>
                                </div>
                            </div>
                            <div className="single-group">
                                <div className="gp-icon"><img src="img/gp-1.jpg" alt="" /></div>
                                <div className="gp-text">Abi_00056</div>
                                <div className="gp-button">
                                    <a href="/" onClick={(event) => getGroupDetaills(event)} className="btn border border-primary follow">View</a>
                                </div>
                            </div>

                            <div className="more-and-less-btn">
                                <a href="/" onClick={(event) => getGroupDetaills(event)} className="show-more">Show more</a>
                            </div>
                        </div>
                    </div>

                    <div className="cmn-card shadow-gray-point-2">
                        <div className="elementory-chunk">
                            <div className="elementory-brand">
                                <div className="elementory-avater-wrap">
                                    <img src="img/b-1.svg" alt="" className="elemetory-avater" />
                                    <h6>Elementry <span>Sponsered</span></h6>
                                </div>
                                <p>Avail 50-80% Off* for this Raksha Bandhan only at #Elementry! Shop NOW!</p>
                            </div>
                            <div className="cd-img">
                                <img src="img/img-1.jpg" alt="" />
                            </div>

                            <div className="text-end p-20">
                                <a href="/" onClick={(event) => navigate(event)} className="btn border border-primary shop-now">Shop now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RightSideBar;