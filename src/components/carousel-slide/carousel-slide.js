import React from 'react';
import './carousel-slide.css';
import { Typography } from '@material-ui/core';

export default function CarouselSlide({ url, height, overlay, title, description }) {
    return <div className="carousel-slide" style={{ backgroundImage: `url(${url})`, height }}>
        {overlay &&
            <div className="carousel-slide__overlay">
                <div className="carousel-slide-overlay__content">
                    {title &&
                        <div className="carousel-slide__title">
                            <Typography variant="h4" color="textSecondary">{title}</Typography>
                        </div>
                    }
                    {description &&
                        <div className="carousel-slide__description">
                            <Typography variant="h6" color="textSecondary">{description}</Typography>
                        </div>
                    }
                </div>
            </div>
        }
    </div>
}