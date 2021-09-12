import React, { useEffect, useState } from 'react';


const groupListDat = [
    {
        id: 1,
        name: 'r/antivax',
        members: '30.8k',
        description: 'This group is a place to share and disscuss new scientic research',
        type: 'TOP',
    },
    {
        id: 2,
        name: 'r/antivax',
        members: '30.8k',
        description: 'This group is a place to share and disscuss new scientic research',
        type: 'TOP',
    },
    {
        id: 3,
        name: 'r/antivax',
        members: '30.8k',
        description: 'This group is a place to share and disscuss new scientic research',
        type: 'TOP',
    },
    {
        id: 4,
        name: 'r/antivax',
        members: '30.8k',
        description: 'This group is a place to share and disscuss new scientic research',
        type: 'TOP',
    },
    {
        id: 5,
        name: 'r/antivax',
        members: '30.8k',
        description: 'This group is a place to share and disscuss new scientic research',
        type: 'TOP',
    },
    {
        id: 6,
        name: 'r/antivax',
        members: '30.8k',
        description: 'This group is a place to share and disscuss new scientic research',
        type: 'TOP',
    },
    {
        id: 7,
        name: 'r/antivax',
        members: '30.8k',
        description: 'This group is a place to share and disscuss new scientic research',
        type: 'TOP',
    }
]

const GroupList = (props) => {


    return (
        <div className="tab-pane fade" id="group-list" role="tabpanel" aria-labelledby="group-list-tab">
            <div className="tb-content-wrapper">
                <div className="cmn-card shadow-gray-point-2">

                    <div className="sorting-row">
                        <div className="sort">
                            <p>Sort by </p>
                            <select name="sort-engage" id="sort-engage" className="selection type-2">
                                <option value="relevance">Relevance</option>
                                <option value="hot">Hot</option>
                                <option value="top">Top</option>
                                <option value="new">New</option>
                                <option value="comment">Comment</option>
                            </select>
                        </div>
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
                            groupListDat.map((element, index)=>{
                                return (
                                    <div className="single-group-or-users" key={element.id}>
                                        <div className="elementory-avater-wrap">
                                            <a href="#" className="elemetory-avater"> <img src="img/gp-1.jpg" alt="" /></a>
                                            <h6><a href="#">{element.name}</a><span>{element.members} Members</span></h6>
                                        </div>
                                        <div className="one-line-relevent-description">
                                            <p>{element.description}</p>
                                        </div>
                                        <a href="#" className="btn primary-bg proxima-bold join">Join</a>
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
