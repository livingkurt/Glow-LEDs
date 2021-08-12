import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/lazy/lazy.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

// import Swiper core and required modules
import SwiperCore, { Lazy, Pagination, Navigation } from 'swiper/core';

// install Swiper modules
SwiperCore.use([ Lazy, Pagination, Navigation ]);

export default function Swipe({ images }) {
	return (
		<Swiper
			style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }}
			lazy={true}
			pagination={{
				clickable: true
			}}
			navigation={true}
			className="mySwiper"
		>
			{console.log({ images })}
			{/* {images &&
				images.map((image, index) => ( */}
			<SwiperSlide>
				<img
					data-src={images && images[0]}
					alt="Swipe"
					title="Swipe"
					className="swiper-lazy"
					style={{
						maxWidth: '400px',
						maxHeight: '400px',
						height: '100%',
						width: '100%'
					}}
				/>
				<div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
			</SwiperSlide>
			<SwiperSlide>
				<img
					data-src={images && images[1]}
					alt="Swipe"
					title="Swipe"
					className="swiper-lazy"
					style={{
						maxWidth: '400px',
						maxHeight: '400px',
						height: '100%',
						width: '100%'
					}}
				/>
				<div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
			</SwiperSlide>
			<SwiperSlide>
				<img
					data-src={images && images[2]}
					alt="Swipe"
					title="Swipe"
					className="swiper-lazy"
					style={{
						maxWidth: '400px',
						maxHeight: '400px',
						height: '100%',
						width: '100%'
					}}
				/>
				<div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
			</SwiperSlide>
			<SwiperSlide>
				<img
					data-src={images && images[3]}
					alt="Swipe"
					title="Swipe"
					className="swiper-lazy"
					style={{
						maxWidth: '400px',
						maxHeight: '400px',
						height: '100%',
						width: '100%'
					}}
				/>
				<div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
			</SwiperSlide>
			{/* ))} */}
		</Swiper>
	);
}
