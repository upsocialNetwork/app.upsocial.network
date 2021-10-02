import { useHistory } from 'react-router-dom';
import Session from '../../utils/session';
import httpClient from '../../services/http';
import { ErrorToast, SuccessToast } from '../../utils/common';



const GroupList = (props) => {
    const history = useHistory();

    let groupListDat = props.groupsList && props.groupsList.result && props.groupsList.result.data ? props.groupsList.result.data : [];


    // console.log(props.groupsList);

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
        }
    }



    const joinOrLeaveGroup = (event, groupid, type) => {
        event.preventDefault();
        let isLogin = Session.isLoggedIn();
        if (isLogin === false) {
            history.push("/auth/login");
        }
        if (type == true) {
            //leaving group
            let formData = {
                "groupId": groupid
            }
            httpClient.call("leave-group", formData, { method: 'POST' }).then(function (response) {
                if (response.success) {
                    SuccessToast(response.result.message);
                    window.location.reload();
                }
                else {
                    ErrorToast(response.result.message);
                }

            }, function (error) {
                console.log(error);
            });

        }
        else {
            //group
            //leaving group
            let formData = {
                "groupId": groupid
            }
            httpClient.call("join-group", formData, { method: 'POST' }).then(function (response) {
                if (response.success) {
                    SuccessToast(response.result.message);
                    window.location.reload();
                }
                else {
                    ErrorToast(response.result.message);
                }

            }, function (error) {
                console.log(error);
            });
        }

    }



    return (
        <div className="tab-pane fade show active" id="group-list" role="tabpanel" aria-labelledby="group-list-tab">
            <div className="tb-content-wrapper">
                <div className="cmn-card shadow-gray-point-2">

                    <div className="sorting-row" hidden>
                        {/* <div className="sort">
                            <p>Sort by </p>
                            <select name="sort-engage" id="sort-engage" className="selection type-2">
                                <option value="relevance">Relevance</option>
                                <option value="hot">Hot</option>
                                <option value="top">Top</option>
                                <option value="new">New</option>
                                <option value="comment">Comment</option>
                            </select>
                        </div> */}
                        <div className="sort">
                            <p>Sort by </p>
                            <select name="sort-time" id="sort-time" className="selection type-2">
                                <option value="All time">All time</option>
                                <option value="Past Hour">Past Hour</option>
                                <option value="Past 24 Hours">Past 24 Hours</option>
                                <option value="Past Week ">Past Week </option>
                                <option value="Past Month">Past Month</option>
                                <option value="Past Year">Past Year</option>
                            </select>
                        </div>
                    </div>
                    <div className="group-and-users-list">
                        {groupListDat && groupListDat.length > 0 &&
                            groupListDat.map((element, index) => {
                                return (
                                    <div className="single-group-or-users" key={element.id}>
                                        <div className="elementory-avater-wrap">

                                            <a href="#" className="elemetory-avater"
                                                onClick={(event) => { groupDetails(event, element.id) }}
                                            >
                                                {element.image ? <img src={"https://ipfs.io/ipfs/" + element.image} alt="" /> : <img src="img/dol-1.png" alt="" />}

                                            </a>
                                            <h6><a href="#"
                                                onClick={(event) => { groupDetails(event, element.id) }}
                                            >{element.name}</a> <span>{element.members.length} Members</span> </h6>
                                        </div>
                                        {/*  <div className="one-line-relevent-description">
                                            <p>{element.description}</p>
                                        </div> */}
                                        <a href="#" onClick={(event) => { groupDetails(event, element.id) }} className="btn primary-bg proxima-bold join">
                                            {/*  {element.joined ? <>Leave</> : <>Join</>} */} View
                                        </a>
                                    </div>
                                )
                            })

                        }
                    </div>
                </div>
            </div>
        </div>

    );
}

export default GroupList;
