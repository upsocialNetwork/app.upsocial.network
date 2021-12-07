import React, { useEffect, useState } from 'react';
import { MiniBar } from 'minibarjs';
import { useHistory } from 'react-router-dom';
import Session from '../../utils/session';
import httpClient from '../../services/http';
const RightSideBar = (props) => {
    let [advertisement, setAdvertisement] = useState(null);

    useEffect(() => {

        props._getPopularGroups();
        getAdvertisement();



    }, [])

    let gl = props.groupData;
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


    const getAdvertisement = () => {
        //  console.log("calling advertisement");
        httpClient.call("get-all-advertisement", null, { method: 'GET' }).then(function (response) {

            if (response.success) {
                let res = response.result.data;
                setAdvertisement(res);
            }
            else {
                setAdvertisement(null);
            }

        }, function (error) {
            console.log(error);
        })
    }

    //console.log(advertisement);



    const rightSide = props.rightSide ? props.rightSide : false;
    if (!rightSide) return null;

    return (
        <div className="right-sidebar-wrapper position-fixed d-none d-lg-block">
            <div className="sidebar-inner scroll-bar">
                <div className="shadow-gurd">
                    <div className="cmn-card shadow-gray-point-2 mb-4">

                        <GroupList grouplist={gl} />
                    </div>



                    {advertisement && advertisement.length > 0 ?
                        advertisement.map((element, index) => {
                            return (<div className="cmn-card shadow-gray-point-2" key={index}>
                                <div className="elementory-chunk">
                                    <div className="elementory-brand">
                                        <div className="elementory-avater-wrap">
                                            <img src="img/b-1.svg" alt="" className="elemetory-avater" />
                                            <h6>{element.title} <span>Sponsered</span></h6>
                                        </div>
                                        <p>{element.description ? element.description : null}</p>
                                    </div>
                                    <div className="cd-img">
                                        {element.data ? <img src={"https://ipfs.io/ipfs/" + element.data} alt="" /> : <img src="img/img-1.jpg" alt="" />}


                                    </div>

                                    <div className="text-end p-20">
                                        <a href={element.link} target="_blank" className="btn border border-primary shop-now">Visit Now</a>
                                    </div>
                                </div>
                            </div>)
                        })

                        : <div className="cmn-card shadow-gray-point-2">
                            <div className="elementory-chunk">
                                <div className="elementory-brand">
                                    <div className="elementory-avater-wrap">
                                        <img src="img/fav.ico" alt="" className="elemetory-avater" />
                                        <h6>UpSocial Network  <span>Sponsered</span></h6>
                                    </div>
                                    <p>🔥 Blockchain backed Decentralized Social Network 🔥 🚀 Post & Earn 🚀 Create Tokens 🚀 Native DeX 🚀 NFT Marketplace</p>
                                </div>
                                <div className="cd-img">
                                    <img src="img/advertisment.jpg" alt="" />
                                </div>

                                <div className="text-end p-20">
                                    <a href="https://upsocial.network/" onClick={(event) => navigate(event)} className="btn border border-primary shop-now">Visit now</a>
                                </div>
                            </div>
                        </div>
                    }



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
            history.push('/group/details/' + id);
        }

    }

    return (

        <div className="single-group-or-users">
            <div className="elementory-avater-wrap">

                <a href="#" className="elemetory-avater"
                    onClick={(event) => { groupDetails(event, element.id) }}
                >
                    {element.image ? <img src={"https://ipfs.io/ipfs/" + element.image} alt="" /> : <img src="img/dol-1.png" alt="" />}

                </a>
                <h6><a href="#"
                    onClick={(event) => { groupDetails(event, element.id) }}
                >r/{element.name}</a> <span>{element.members.length} Members</span> </h6>

            </div>
        </div>
    )
}




export default RightSideBar;