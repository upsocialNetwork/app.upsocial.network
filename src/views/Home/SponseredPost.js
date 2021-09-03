import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';


const SponseredPost = (props) => {

    let element = props.postData;

    const navigate = (event) => {
        event.preventDefault()
    }

    return (
        <div className="cmn-card mb-4">
            <div className="elementory-chunk">
                <div className="elementory-brand">
                    <div className="elementory-avater-wrap">
                        <img src="img/b-1.svg" alt="" className="elemetory-avater" />
                        <h6>{element.title} <span>{element.subTitle}</span></h6>
                    </div>
                    <p>{element.description}</p>
                </div>

                <div className="sponsor-slider">
                    <Splide 
                        options={{
                            perPage: 2,
                            gap: 10,
                            type: 'loop',
                            arrows: false,
                            pagination: false,
                            autoplay: true,
                            padding: {
                                right: '116px'
                            },
                            breakpoints: {
                                480: {
                                    perPage: 1,
                                }
                            }
                        }}
                    >
                        {element && element.media && element.media.length > 0 && 
                            element.media.map((mediaElement, key)=>{
                                return (
                                    <SplideSlide key={key}>
                                        <div className="sposor-item">
                                            <div className="cd-img">
                                                <img src={mediaElement.image} alt="" />
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between p-20">
                                                <p>{mediaElement.title}</p>
                                                <a href="/" onClick={(event)=>navigate(event)} className="btn border border-primary shop-now f-bold">Shop now</a>
                                            </div>
                                        </div>
                                    </SplideSlide>
                                )
                            })
                        }
                    </Splide>
                </div>
            </div>
        </div>
    );
}

export default SponseredPost;
