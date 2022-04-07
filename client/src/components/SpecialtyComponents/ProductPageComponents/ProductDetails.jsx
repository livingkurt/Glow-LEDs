// React
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Overflow from 'react-overflow-indicator';
import { Link, useHistory } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import { ReadMore, Reviews } from '..';
import { humanize, toCapitalize } from '../../../utils/helper_functions';
import useWindowDimensions from '../../Hooks/windowDimensions';

const ProductDetails = ({ product, manuals, description, included_items, pathname }) => {
	const [ canScroll, setCanScroll ] = useState(false);
	const { width } = useWindowDimensions();
	const [ sizing, set_sizing ] = useState([]);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				const sizes = [
					{ size: width > 500 ? 'Small' : 'S', hand_length: '5 - 6', hand_width: '2.8 - 3.1' },
					{ size: width > 500 ? 'Medium' : 'M', hand_length: '5.5 - 6.5', hand_width: '2.9 - 3.2' },
					{ size: width > 500 ? 'Large' : 'L', hand_length: '6.5 - 7', hand_width: '3.2 - 3.5' },
					{ size: width > 500 ? 'X-Large' : 'XL', hand_length: '7 - 7.5', hand_width: '3.5 - 3.7' },
					{
						size: width > 500 ? '2X-Large (Coming Soon)' : '2XL',
						hand_length: '7.5 - 8',
						hand_width: '3.7 - 4'
					}
				];
				set_sizing(sizes);
			}
			return () => (clean = false);
		},
		[ width ]
	);

	return (
		<div>
			<Tabs>
				<Overflow onStateChange={(state) => setCanScroll(state.canScroll.right)}>
					<Overflow.Content>
						<TabList>
							<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>Description</Tab>
							{(product.name === 'Supremes' ||
								product.name === 'Refresh Pack (6 Supreme Pairs + 120 Batteries)') && (
								<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>Sizing</Tab>
							)}
							<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>Included Items</Tab>
							<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>Product Dimensions</Tab>
							{product.chips &&
							product.chips.length > 0 && (
								<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
									Compatible Chips
								</Tab>
							)}
							<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>Reviews</Tab>
							{manuals &&
							manuals[product.category] && (
								<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>Manual</Tab>
							)}
							<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>Media</Tab>
							{product.contributers &&
							product.contributers.length > 0 && (
								<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>Contributers</Tab>
							)}
						</TabList>
					</Overflow.Content>
					{canScroll && (
						<div className="tab_indicator bob br-5px ta-c bg-primary h-30px w-30px p-4px box-s-d b-1px">
							{'>'}
						</div>
					)}
				</Overflow>

				<TabPanel style={{ borderRadius: '0px 10px 10px 10px' }}>
					<h2 className="m-0px mr-5px mt-1rem"> Description: </h2>
					<ReadMore width={1000} className="paragraph_font" pre={true} length={100}>
						{description}
					</ReadMore>
				</TabPanel>
				{(product.name === 'Supremes' || product.name === 'Refresh Pack (6 Supreme Pairs + 120 Batteries)') && (
					<TabPanel style={{ borderRadius: '0px 10px 10px 10px' }}>
						<div className="order-list responsive_table">
							<h2 className="ta-c w-100per jc-c">Supreme Sizing</h2>
							<p className="w-100per jc-c">
								{' '}
								<label className="jc-c title_font mr-10px">Hand Length:</label>{' '}
								<label>Measures from Base of Palm to Tip of the Middle Finger</label>
							</p>
							<p className="w-100per jc-c">
								<label className=" jc-c title_font mr-10px">Hand Width:</label>{' '}
								<label>Across the middle of the palm not including Thumb</label>
							</p>
							<p className="w-100per jc-c">
								<label className=" jc-c title_font mr-10px">Note:</label>{' '}
								<label>All Measurments are in inches</label>
							</p>
							<table className="styled-table">
								<thead>
									<tr>
										<th>Size</th>
										<th>Hand Length</th>
										<th>Hand Width</th>
									</tr>
								</thead>
								<tbody>
									{sizing.map((size) => (
										<tr
											style={{
												backgroundColor: '#d1d1d1',
												fontSize: '16px',
												height: '50px',
												color: '#4d5061'
											}}
											className=""
										>
											<th style={{ width: '10px' }}>{size.size}</th>
											<th style={{ width: '10px' }}>{size.hand_length}</th>
											<th style={{ width: '10px' }}>{size.hand_width}</th>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</TabPanel>
				)}
				<TabPanel>
					<div className="mt-1rem">
						<h2 className="m-0px mr-5px"> Included Items: </h2>
						<div className="h-100per paragraph_font">
							<ul className="pl-2rem">
								{included_items ? (
									included_items.split('\n').map((line, index) => {
										return (
											<li
												key={index}
												className="paragraph_font"
												style={{ listStyleType: 'disc' }}
											>
												{line}
											</li>
										);
									})
								) : (
									included_items
								)}
							</ul>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					{product.product_length &&
					product.product_length && (
						<div className="mt-1rem">
							<h2 className="m-0px mr-5px"> Product Dimensions: </h2>
							<div className="h-100per paragraph_font">
								{product.name === 'Coin Battery Storage' ? (
									`${product.product_length} cm x ${product.product_width} cm x
											${product.product_height} cm`
								) : product.name === 'Glow Stringz V2 50 LED / 3.5m' ? (
									`${product.product_length} m x ${product.product_width} m x
											${product.product_height} m`
								) : (
									`${product.product_length} mm x ${product.product_width} mm x
											${product.product_height} mm`
								)}
							</div>
						</div>
					)}
				</TabPanel>
				{product.chips &&
				product.chips.length > 0 && (
					<TabPanel>
						{product.chips &&
						product.chips.length > 0 && (
							<div className="mt-1rem">
								<h2 className="m-0px mr-5px"> Compatible Chips: </h2>
								<div className="h-100per paragraph_font ">
									<ul className="pl-2rem">
										{product.chips ? (
											product.chips.map((chip, index) => {
												return (
													<li
														key={index}
														className="paragraph_font"
														style={{ listStyleType: 'disc' }}
													>
														{chip.name}
													</li>
												);
											})
										) : (
											product.chips
										)}
									</ul>
								</div>
							</div>
						)}
					</TabPanel>
				)}
				<TabPanel>
					<div className="content-margined">
						{!product.reviews.length && (
							<div style={{ marginBottom: '10px' }}>Be the First to Review this Product</div>
						)}
						<Reviews product={product} pathname={pathname} />
					</div>
				</TabPanel>
				{manuals &&
				manuals[product.category] && (
					<TabPanel>
						<div className="jc-b">
							<div className="mb-10px">
								<Link to={`/pages/menu/manuals`}>
									<button className="btn secondary">View All Manuals</button>
								</Link>
							</div>
							<div className="mb-10px">
								<Link
									to={`https://www.glow-leds.com/collections/all/products/${product.category}/${product.subcategory}/${product.pathname}`}
								>
									<button className="btn secondary">
										View Available {toCapitalize(humanize(product.category))}
									</button>
								</Link>
							</div>
						</div>
						<h2
							style={{
								textAlign: 'center',
								width: '100%',
								justifyContent: 'center'
							}}
						>
							{manuals[product.category].name}
						</h2>
						{manuals[product.category].manual && (
							<img src={manuals[product.category].manual} alt="manual" className="w-100per" />
						)}
						{manuals[product.category].manual && (
							<h2
								style={{
									textAlign: 'center',
									width: '100%',
									justifyContent: 'center'
								}}
							>
								Watch the Videos below to Learn More
							</h2>
						)}
						<div className="jc-c column m-0px">
							{manuals[product.category].videos.map((video) => (
								<div>
									<h2
										style={{
											textAlign: 'center',
											width: '100%',
											justifyContent: 'center'
										}}
									>
										{video.title}
									</h2>
									<div className="iframe-container">
										<iframe
											width="996"
											height="560"
											title={video.title}
											style={{ borderRadius: '20px' }}
											src={`https://www.youtube.com/embed/${video.video}?mute=1&showinfo=0&rel=0&autoplay=0&loop=1`}
											frameborder="0"
											allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
											allowfullscreen="1"
										/>
									</div>
								</div>
							))}
						</div>
					</TabPanel>
				)}
				<TabPanel style={{ borderRadius: '10px 0px 10px 10px' }}>
					{!product.video ? (
						<h2
							style={{
								textAlign: 'center',
								width: '100%',
								justifyContent: 'center'
							}}
						>
							Video Coming Soon!
						</h2>
					) : (
						<div className="jc-c column m-0px">
							<h2
								style={{
									textAlign: 'center',
									width: '100%',
									justifyContent: 'center'
								}}
							>
								Watch the Video Below to Learn More
							</h2>
							<div className="iframe-container">
								<iframe
									width="996"
									height="560"
									title={product.name}
									style={{ borderRadius: '20px' }}
									src={`https://www.youtube.com/embed/${product.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
									frameborder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen="1"
								/>
							</div>
						</div>
					)}
					<div className="p-1rem">
						{product.category === 'glowskinz' && (
							<img
								className="colored_caps_images"
								src="https://images2.imgbox.com/d2/67/qjRp33SP_o.png"
								alt="Glowskinz Chip Compatibility"
								title="Glowskinz Chip Compatibility"
							/>
						)}

						{(product.category === 'diffuser_caps' || product.category === 'mega_diffuser_caps') && (
							<div>
								<h2 className="ta-c">Get your favorite caps in all of these new colors</h2>
								<div className="colored_caps">
									<div className="colored_caps_item m-1rem">
										<h3 className="colored_caps_images">Colored Caps</h3>
										<img
											className="colored_caps_images"
											src="/images/optimized_images/product_page_images/img_2298_cropped_optimized.jpg"
											alt="Colored Caps"
											title="Colored Caps"
										/>
									</div>
									<div className="colored_caps_item m-1rem">
										<h3 className="colored_caps_images">Colored Caps Under Blacklight</h3>
										<img
											className="colored_caps_images"
											src="/images/optimized_images/product_page_images/img_2331_cropped_optimized.jpg"
											alt="Colored Caps Under Blacklight"
											title="Colored Caps Under Blacklight"
										/>
									</div>
								</div>
							</div>
						)}
						{product.category === 'diffusers' && (
							<div>
								<h2 className="ta-c">Get your favorite caps in all of these new colors</h2>
								<div className="colored_caps">
									<div className="colored_caps_item m-1rem">
										<h3 className="colored_caps_images">Colored Diffusers</h3>
										<img
											className="colored_caps_images"
											src="https://thumbs2.imgbox.com/78/e1/DfIDjh1r_t.jpeg"
											alt="Colored Caps"
											title="Colored Caps"
										/>
									</div>
									<div className="colored_caps_item m-1rem">
										<h3 className="colored_caps_images">Colored Diffusers No Light</h3>
										<img
											className="colored_caps_images"
											src="https://thumbs2.imgbox.com/b9/5c/9jcxAh23_t.jpeg"
											alt="Colored Caps Under Blacklight"
											title="Colored Caps Under Blacklight"
										/>
									</div>
								</div>
							</div>
						)}
						{(product.category === 'diffuser_caps' || product.category === 'mega_diffuser_caps') && (
							<div className=" m-2rem  h-auto m-auto jc-c">
								<img
									className="max-w-819px w-100per h-auto "
									src="https://images2.imgbox.com/af/ba/QWR9I16I_o.png"
									alt="Graphic Timeline"
									title="Diffuser Cap and Mega Diffuser Cap Name Change Timeline"
								/>
							</div>
						)}
					</div>
				</TabPanel>
				{product.contributers &&
				product.contributers.length > 0 && (
					<TabPanel>
						{product.contributers &&
						product.contributers.length > 0 && (
							<div className="mt-1rem">
								<h2 className="m-0px mr-5px">Contributers</h2>
								<div className="h-100per paragraph_font ">
									<ul className="pl-2rem">
										{product.contributers ? (
											product.contributers.map((contributer, index) => {
												return (
													<li
														key={index}
														className="paragraph_font"
														style={{ listStyleType: 'disc' }}
													>
														{contributer.first_name} {contributer.last_name}
													</li>
												);
											})
										) : (
											product.contributers
										)}
									</ul>
								</div>
							</div>
						)}
					</TabPanel>
				)}
			</Tabs>
		</div>
	);
};

export default ProductDetails;
