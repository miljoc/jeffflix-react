import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { forceCheck } from 'react-lazyload';

import { ArrowPrev, ArrowNext } from './Arrows';

const Carousel = (props) => {
    const { children } = props;

    return (
        <Slider
            infinite={false}
            speed="500"
            slidesToShow="6"
            slidesToScroll="6"
            nextArrow={<ArrowNext />}
            prevArrow={<ArrowPrev />}
            afterChange={() => forceCheck()}
            responsive={[
                {
                    breakpoint: 9999,
                    settings: {
                        slidesToShow: 10,
                    },
                },
                {
                    breakpoint: 2200,
                    settings: {
                        slidesToShow: 8,
                    },
                },
                {
                    breakpoint: 1800,
                    settings: {
                        slidesToShow: 7,
                    },
                },
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 6,
                    },
                },
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 5,
                    },
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                    },
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                    },
                },
            ]}
        >
            {children}
        </Slider>
    );
};

Carousel.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Carousel;
