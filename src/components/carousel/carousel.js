import React from 'react';
import './carousel.css';

export default class Carousel extends React.Component {
    constructor() {
        super();
        this.state = {
            carouselWidth: 'auto',
            resizeObserver: null,
            activeSlideIndex: null,
            intervalId: null,
            playId: null,
        }
        this.carouselRef = React.createRef();
        this.isActive = this.isActive.bind(this);
        this.getItemClass = this.getItemClass.bind(this);
        this.subscribeToResize = this.subscribeToResize.bind(this);
        this.goToNextSlide = this.goToNextSlide.bind(this);
        this.play = this.play.bind(this);
    }

    isLastSlide() {
        return this.state.activeSlideIndex === this.props.children?.length - 1;
    }

    isActive(index) {
        return index === this.state.activeSlideIndex;
    }

    getItemClass(index) {
        return 'carousel-dots-container__dot' + (this.isActive(index) ? ' carousel-dots-container__dot--active' : '')
    }

    goToSlide(index) {
        this.setState({ activeSlideIndex: index });
        const left = index * this.state.carouselWidth;
        this.carouselRef.current.scrollTo({ left, behavior: 'smooth' });
    }

    subscribeToResize() {
        const obs = new ResizeObserver(() => {
            const width = this.carouselRef?.current?.clientWidth;
            this.setState({ carouselWidth: width });
        });
        obs.observe(this.carouselRef.current);
        this.setState({ resizeObserver: obs });
    }

    goToNextSlide() {
        if (this.isLastSlide()) {
            this.goToSlide(0);
        } else {
            this.goToSlide(this.state.activeSlideIndex + 1);
        }
    }

    play() {
        const interval = this.props.interval || 3000;
        return setInterval(() => this.goToNextSlide(), interval);
    }

    stop() {
        clearInterval(this.state.playId);
    }

    componentDidMount() {
        this.subscribeToResize();
    }

    componentDidUpdate(prevProps, props) {
        if (props.width !== 'auto' && !this.state.playId) {
            this.setState({ playId: this.play() });
        }
    }

    componentWillUnmount() {
        this.state.resizeObserver.disconnect();
        this.stop();
    }

    render() {
        return (
            <div className="carousel">
                <div className="carousel__wrapper" ref={this.carouselRef}>
                    <div className="carousel__slides-container">
                        {this.props.children?.map((child, index) =>
                            <div key={index} style={{ width: this.state.carouselWidth + 'px' }} className="carousel-slides-container__slide">
                                {child}
                            </div>
                        )}
                    </div>
                </div>
                <div className="carousel_dots-container">
                    {this.props.children?.map((child, index) => {
                        return <div key={index} className={this.getItemClass(index)} onClick={() => this.goToSlide(index)}></div>
                    })}
                </div>
            </div>
        );
    }
}
