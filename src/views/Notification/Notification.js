import { useEffect, useState } from "react"
import httpClient from "../../services/http";
import { Loader } from "../../utils/common";
import Session from "../../utils/session";
import { useHistory } from 'react-router-dom';


const Notification = props => {
    const history = useHistory();
    let [notification, setNotification] = useState('');


    useEffect(() => {

        const userData = Session.getSessionData();
        if (userData === null) {
            history.push("/auth/login");
        }

        myNotification();

    }, [])


    const myNotification = () => {
        Loader(true);

        httpClient.call("get-notification", null, { method: 'GET' }).then(function (response) {
            if (response.success) {

                setNotification(response.result.data);
                //console.log(response);
                //SuccessToast(response.result.message);
                //testing message

                Loader(false);
            }
            else {
                Loader(false);
                // ErrorToast(response.result.message);
            }

        }, function (error) {
            Loader(false);
            console.log(error);
        })

    }


    const navigate = (event) => {
        event.preventDefault();
    }

    return (<main className="main-content mx-auto">


        <ul className="nav nav-tabs" id="myTab" role="tablist">

            <li className="nav-item" role="presentation">
                <button className="nav-link " id="group-list-tab" data-bs-toggle="tab" data-bs-target="#group-list1"
                    type="button" role="tab" aria-controls="profile" aria-selected="false">Notifications</button>
            </li>

        </ul>
        <div className="tab-content mb-4" id="myTabContent">
            <div className="tab-pane fade show active" id="group-list1" role="tabpanel" aria-labelledby="group-list-tab">
                <div className="tb-content-wrapper">
                    <div className="cmn-card shadow-gray-point-2">
                        <div className="group-and-users-list">
                            {notification && notification.length > 0 &&
                                notification.map((element, index) => {
                                    return (
                                        <div className="single-group" key={index}>

                                            <div className="gp-icon">
                                                <a href="#" onClick={(event) => { navigate(event) }} >
                                                    {element.userImage ?
                                                        <img src={"https://ipfs.io/ipfs/" + element.userImage}

                                                        /> :
                                                        <img src="img/dol-1.png" alt="" />

                                                    }
                                                </a>
                                            </div>
                                            {/* <a href="#" onClick={(event) => { navigate(event) }} style={{ textDecoration: 'none' }} >
                                                */} <div className="gp-text ">
                                                    {element.message}
                                                </div>
                                            {/* </a> */}
                                        </div>
                                    )
                                })

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>);
}
export default Notification;