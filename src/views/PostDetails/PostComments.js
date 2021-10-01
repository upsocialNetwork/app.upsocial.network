import React, { useEffect } from 'react';
import _ from 'underscore';

// const commentData = [
//     {
//         id: 1,
//         postedBy: 'Aparna Ghone',
//         createDate: 'Aug 13, 2021 5.05 PM',
//         comment: 'Ex sunt mollit elit dolor eiusmod quis ullamco sit ea incididunt. Lorem qui nostrud excepteur ipsum consectetur.',
//         reply: [
//             {
//                 id: 99,
//                 postedBy: 'Aparna Ghone',
//                 createDate: 'Aug 13, 2021 5.05 PM',
//                 comment: 'Ex sunt mollit elit dolor eiusmod quis ullamco sit ea incididunt. Lorem qui nostrud excepteur ipsum consectetur.',
//                 reply: [
//                     {
//                         id: 51,
//                         postedBy: 'Aparna Ghone',
//                         createDate: 'Aug 13, 2021 5.05 PM',
//                         comment: 'Ex sunt mollit elit dolor eiusmod quis ullamco sit ea incididunt. Lorem qui nostrud excepteur ipsum consectetur.',
//                     },
//                     {
//                         id: 52,
//                         postedBy: 'Aparna Ghone',
//                         createDate: 'Aug 13, 2021 5.05 PM',
//                         comment: 'Ex sunt mollit elit dolor eiusmod quis ullamco sit ea incididunt. Lorem qui nostrud excepteur ipsum consectetur.',
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         id: 2,
//         postedBy: 'Aparna Ghone',
//         createDate: 'Aug 13, 2021 5.05 PM',
//         comment: 'Ex sunt mollit elit dolor eiusmod quis ullamco sit ea incididunt. Lorem qui nostrud excepteur ipsum consectetur.',
//         reply: [
//             {
//                 id: 98,
//                 postedBy: 'Aparna Ghone',
//                 createDate: 'Aug 13, 2021 5.05 PM',
//                 comment: 'Ex sunt mollit elit dolor eiusmod quis ullamco sit ea incididunt. Lorem qui nostrud excepteur ipsum consectetur.',
//                 reply: [
//                     {
//                         id: 53,
//                         postedBy: 'Aparna Ghone',
//                         createDate: 'Aug 13, 2021 5.05 PM',
//                         comment: 'Ex sunt mollit elit dolor eiusmod quis ullamco sit ea incididunt. Lorem qui nostrud excepteur ipsum consectetur.',
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         id: 3,
//         postedBy: 'Aparna Ghone',
//         createDate: 'Aug 13, 2021 5.05 PM',
//         comment: 'Ex sunt mollit elit dolor eiusmod quis ullamco sit ea incididunt. Lorem qui nostrud excepteur ipsum consectetur.',
//         reply: [
//             {
//                 id: 97,
//                 postedBy: 'Aparna Ghone',
//                 createDate: 'Aug 13, 2021 5.05 PM',
//                 comment: 'Ex sunt mollit elit dolor eiusmod quis ullamco sit ea incididunt. Lorem qui nostrud excepteur ipsum consectetur.',
//                 reply: [
//                     {
//                         id: 54,
//                         postedBy: 'Aparna Ghone',
//                         createDate: 'Aug 13, 2021 5.05 PM',
//                         comment: 'Ex sunt mollit elit dolor eiusmod quis ullamco sit ea incididunt. Lorem qui nostrud excepteur ipsum consectetur.',
//                     }
//                 ]
//             }
//         ]
//     }
// ]

var commentData = [
    {
        "commentId": 8,
        "comment": "mai",
        "userId": 1,
        "userName": "KD",
        "parentId": 2,
        "childIds": [],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    },
    {
        "commentId": 7,
        "comment": "grand mother",
        "userId": 1,
        "userName": "KD",
        "parentId": 2,
        "childIds": [],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    },
    {
        "commentId": 6,
        "comment": "grand father",
        "userId": 1,
        "userName": "KD",
        "parentId": 2,
        "childIds": [],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    },
    {
        "commentId": 5,
        "comment": "trunks",
        "userId": 1,
        "userName": "KD",
        "parentId": 2,
        "childIds": [],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    },
    {
        "commentId": 4,
        "comment": "Bullama",
        "userId": 1,
        "userName": "KD",
        "parentId": 2,
        "childIds": [],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    },
    {
        "commentId": 3,
        "comment": "Gohan",
        "userId": 1,
        "userName": "KD",
        "parentId": 1,
        "childIds": [],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    },
    {
        "commentId": 2,
        "comment": "Vegita",
        "userId": 1,
        "userName": "KD",
        "parentId": 0,
        "childIds": [
            4,
            5,
            6,
            7,
            8
        ],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    },
    {
        "commentId": 1,
        "comment": "Goku",
        "userId": 1,
        "userName": "KD",
        "parentId": 0,
        "childIds": [
            3
        ],
        "postedBy": 'Aparna Ghone',
        "createDate": 'Aug 13, 2021 5.05 PM',
    }
]



const PostComments = (props) => {



    let element = props.postData;


    useEffect(() => {
    }, [])

    const navigate = (event) => {
        event.preventDefault()
    }

    return (
        <div className="all-comments-wrapper max-520">
            <div className="comments-crud-wrap">
                {/*  <h1>{commentCount} Comments </h1> */}

                {/*  <h1>{commentCount} Comments <span className="page-counter">Page 1 of 5</span></h1>
 */}

                <div className="nav nav-tabs comment-new-old-switch" role="tablist" hidden>
                    <button id="newestComment-tab" data-bs-toggle="tab"
                        data-bs-target="#newestComment" role="tab" aria-selected="true"
                        className="switch active">Newest</button>
                    <button id="oldestComment-tab" data-bs-toggle="tab"
                        data-bs-target="#oldestComment" role="tab" aria-selected="false"
                        className="switch">Oldest</button>
                </div>
            </div>

            <div className="tab-content comment-tab-content" id="commentTabContent">
                <div className="tab-pane fade show active" id="newestComment" role="tabpanel"
                    aria-labelledby="newestComment-tab">
                    <ul className="comments-dispaly">
                        {commentData && commentData.length > 0 &&

                            commentData.map((commentElement, index) => {
                                if (commentElement.parentId != 0) return null;

                                return (
                                    <li key={index}>
                                        <div className="elementory-avater-wrap single-comment">
                                            <a href="/" onClick={(event) => navigate(event)} className="elemetory-avater"><img
                                                src="img/dol-1.png" alt="" /></a>
                                            <div className="comment-part">
                                                <h6><strong>Posted by</strong><a href="/" onClick={(event) => navigate(event)}>{commentElement.postedBy}</a>{/* <span>{commentElement.createDate}</span> */}</h6>
                                                <div className="comment-text">
                                                    <p>{commentElement.comment}</p>
                                                </div>

                                                <div className="reply-or-report-btn d-flex justify-content-end">
                                                    <button className="reply" data-bs-toggle="collapse"
                                                        data-bs-target={"#reply-" + commentElement.id}>Reply</button>
                                                    <button className="report" hidden>Report</button>
                                                </div>

                                                <form action="#" className="reply-form collapse" id={"reply-" + commentElement.id}>
                                                    <textarea className="form-control reply-textarea" name="reply-comment" id="reply-comment"></textarea>
                                                    <div className="text-end mt-3">
                                                        <button type="submit" className="btn gradient-bg-one radius-30 f-bold reply-post">Post</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        {commentElement.childIds && commentElement.childIds.length > 0 &&
                                            <ul className="nested-comment">
                                                {
                                                    commentElement.childIds.map((childElement, key) => {
                                                        let index = _.findIndex(commentData, { commentId: childElement });
                                                        let replyElement = commentData[index];
                                                        return (
                                                            <li key={key}>
                                                                <div className="elementory-avater-wrap single-comment">
                                                                    <a href="/" onClick={(event) => navigate(event)} className="elemetory-avater"><img
                                                                        src="img/dol-1.png" alt="" /></a>
                                                                    <div className="comment-part">
                                                                        <h6><strong>Posted by</strong><a href="/" onClick={(event) => navigate(event)}>{replyElement.postedBy}</a>{/* <span>{replyElement.createDate}</span> */}</h6>
                                                                        <div className="comment-text">
                                                                            <p>{replyElement.comment}</p>
                                                                        </div>

                                                                        <div
                                                                            className="reply-or-report-btn d-flex justify-content-end">
                                                                            <button className="reply" data-bs-toggle="collapse"
                                                                                data-bs-target={"#nestedOne-reply-" + replyElement.id}>Reply</button>
                                                                            <button className="report" hidden>Report</button>
                                                                        </div>

                                                                        <form action="#" className="reply-form collapse" id={"nestedOne-reply-" + replyElement.id}>
                                                                            <textarea className="form-control reply-textarea" name="reply-comment" id="reply-comment"></textarea>
                                                                            <div className="text-end mt-3">
                                                                                <button type="submit" className="btn gradient-bg-one radius-30 f-bold reply-post">Post</button>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                                {/* {replyElement.reply && replyElement.reply.length > 0 &&
                                                                    <ul className="nested-comment">
                                                                        {
                                                                            replyElement.reply.map((replyElement, key) => {
                                                                                return (
                                                                                    <li key={key}>
                                                                                        <div className="elementory-avater-wrap single-comment">
                                                                                            <a href="/" onClick={(event) => navigate(event)} className="elemetory-avater"><img
                                                                                                src="img/dol-1.png" alt="" /></a>
                                                                                            <div className="comment-part">
                                                                                                <h6><strong>Posted by</strong><a href="/" onClick={(event) => navigate(event)}>{replyElement.postedBy}</a><span>{replyElement.createDate}</span></h6>
                                                                                                <div className="comment-text">
                                                                                                    <p>{replyElement.comment}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>

                                                                } */}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        }

                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PostComments;
