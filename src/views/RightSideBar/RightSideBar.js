import React, { useEffect } from 'react';
import { MiniBar } from 'minibarjs';
import { useHistory } from 'react-router-dom';
import Session from '../../utils/session';

const RightSideBar = (props) => {

    useEffect(() => {

        props._getPopularGroups();



    }, [])

    let gl = props.groupData;
    // console.log(gl);


   // const history = useHistory();

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

    /* const getGroupDetaills = (event) => {
        event.preventDefault();
        history.push('/create-group-join');

    } */




    const rightSide = props.rightSide ? props.rightSide : false;
    if (!rightSide) return null;

    return (
        <div className="right-sidebar-wrapper position-fixed d-none d-lg-block">
            <div className="sidebar-inner scroll-bar">
                <div className="shadow-gurd">
                    <div className="cmn-card shadow-gray-point-2 mb-4">

                        <GroupList grouplist={gl} />
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
                                <a href="#" onClick={(event) => navigate(event)} className="btn border border-primary shop-now">Shop now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


const GroupList = (props) => {

    let postData = props.grouplist && props.grouplist.result && props.grouplist.result.data ? props.grouplist.result.data : [];
    const history = useHistory();
    const searchGroup = (event) => {
        event.preventDefault();
        history.push('/user/top-groups');
    }

    return (

        <div className="groups-wrapper">
            <h4 className="cmn-card-title">Top Groups</h4>
            {postData && postData.length > 0 &&
                postData.map((element, index) => {
                    switch (element.type) {
                        case "Public": return <GroupRecord key={index} postData={element} />;
                        case "Private": return <GroupRecord key={index} postData={element} />;
                        case "Protected": return <GroupRecord key={index} postData={element} />;
                        default: return <GroupRecord key={index} postData={element} />;
                    }
                })
            }
            <div className="more-and-less-btn">
                <a href="#" onClick={(event) => { searchGroup(event) }} className="show-more">Show more</a>
            </div>

        </div>
    )
}

const GroupRecord = (props) => {

    const history = useHistory();
    let element = props.postData;

    //console.log(element);
    const navigate = (event) => {
        event.preventDefault();
    }


    const groupDetails = (event, id) => {
        event.preventDefault();
        let isLogin = Session.isLoggedIn();
        if (isLogin === false) {
            history.push("/auth/login");
        } else {

            history.push({
                pathname: '/group/details',
                search: '?id=' + id + '',
                state: { detail: id }
            });
            if (window.location.pathname === "/group/details") {

                window.location.reload();
            }
        }

    }

    return (
        <div className="single-group">

            <div className="gp-icon">
                <a href="#" onClick={(event) => { groupDetails(event, element.id) }} >
                    {element.image ? <img src={"https://ipfs.io/ipfs/" + element.image} alt="" /> : <img src="img/dol-1.png" alt="" />}
                </a>
            </div>
            <a href="#" onClick={(event) => { groupDetails(event, element.id) }} style={{ textDecoration: 'none' }} >
                <div className="gp-text text-justify">
                    {element.name}
                </div>
            </a>
            <div className="gp-button ">
                <a href="#" onClick={(event) => { groupDetails(event, element.id) }} className="btn border border-primary follow float-right">View</a>
            </div>


        </div>
    )
}




export default RightSideBar;