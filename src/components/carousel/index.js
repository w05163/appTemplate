import React from 'react';
import Carousel from 'nuka-carousel';

class MyCarousel extends Carousel {
	componentWillReceiveProps(nextProps) {
		this.setState({
			slideCount: nextProps.children.length
		});
		this.setDimensions(nextProps);
		if (nextProps.slideIndex !== this.state.currentSlide) {
			this.setState({ currentSlide: nextProps.slideIndex });
		}
		if (this.props.autoplay !== nextProps.autoplay) {
			if (nextProps.autoplay) {
				this.startAutoplay();
			} else {
				this.stopAutoplay();
			}
		}
	}

	goToSlide(index) {
		const self = this;
		if (index >= React.Children.count(this.props.children) || index < 0) {
			if (!this.props.wrapAround) {
				return;
			}
			if (index >= React.Children.count(this.props.children)) {
				this.props.beforeSlide(this.state.currentSlide, 0);
				return this.setState(
					{
						currentSlide: 0,
					},
					() => {
						self.animateSlide(
							null,
							null,
							self.getTargetLeft(null, index),
							() => {
								self.animateSlide(null, 0.01);
								self.props.afterSlide(0);
								self.resetAutoplay();
								self.setExternalData();
							}
						);
					}
				);
			} else {
				const endSlide =
					React.Children.count(this.props.children) - this.state.slidesToScroll;
				this.props.beforeSlide(this.state.currentSlide, endSlide);
				return this.setState(
					{
						currentSlide: endSlide,
					},
					() => {
						self.animateSlide(
							null,
							null,
							self.getTargetLeft(null, index),
							() => {
								self.animateSlide(null, 0.01);
								self.props.afterSlide(endSlide);
								self.resetAutoplay();
								self.setExternalData();
							}
						);
					}
				);
			}
		}

		this.props.beforeSlide(this.state.currentSlide, index);

		if (index !== this.state.currentSlide) {
			this.props.afterSlide(index);
		}
		this.setState(
			{
				currentSlide: index,
			},
			() => {
				self.animateSlide(null, null, null, () => this.props.onAnimateSlideEnd(index));
				self.resetAutoplay();
				self.setExternalData();
			}
		);
	}
}

export default MyCarousel;
