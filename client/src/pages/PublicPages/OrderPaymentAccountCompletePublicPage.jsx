import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const OrderPaymentAccountCompletePublicPage = (props) => {
	return (
		<div className="column jc-c">
			<Helmet>
				<title>Payment Complete | Glow LEDs</title>
				<meta property="og:title" content="Payment Complete" />
				<meta name="twitter:title" content="Payment Complete" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/checkout/paymentcomplete/" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/checkout/paymentcomplete/" />
			</Helmet>
			<div>
				<h1 className="ta-c">Payment Successful</h1>
				<div className="jc-c">
					<h3 className="mr-1rem mv-0px">Order Number: </h3>
					<h4 className="mv-0px">{props.match.params.id}</h4>
				</div>
				<p className="ta-c">Thank you for your payment </p>
				<p className="ta-c">We appreciate your support</p>
				<a href="https://imgbox.com/c5BzcAnj" target="_blank">
					<img src="https://thumbs2.imgbox.com/65/c5/c5BzcAnj_t.jpg" alt="image host" />
				</a>{' '}
				<a href="https://imgbox.com/uKgz8oV0" target="_blank">
					<img src="https://thumbs2.imgbox.com/b5/04/uKgz8oV0_t.jpg" alt="image host" />
				</a>{' '}
				<a href="https://imgbox.com/E5onqqTC" target="_blank">
					<img src="https://thumbs2.imgbox.com/5f/21/E5onqqTC_t.jpg" alt="image host" />
				</a>{' '}
				<a href="https://imgbox.com/gJGNJu8z" target="_blank">
					<img src="https://thumbs2.imgbox.com/85/cb/gJGNJu8z_t.jpg" alt="image host" />
				</a>{' '}
				<a href="https://imgbox.com/bfZb8Byq" target="_blank">
					<img src="https://thumbs2.imgbox.com/85/f8/bfZb8Byq_t.jpg" alt="image host" />
				</a>{' '}
				<a href="https://imgbox.com/n6Atm5SQ" target="_blank">
					<img src="https://thumbs2.imgbox.com/cc/54/n6Atm5SQ_t.jpg" alt="image host" />
				</a>{' '}
				<a href="https://imgbox.com/Q8iUIUMa" target="_blank">
					<img src="https://thumbs2.imgbox.com/80/a7/Q8iUIUMa_t.jpg" alt="image host" />
				</a>{' '}
				<a href="https://imgbox.com/xWO5OkAm" target="_blank">
					<img src="https://thumbs2.imgbox.com/02/11/xWO5OkAm_t.jpg" alt="image host" />
				</a>{' '}
				<a href="https://imgbox.com/HhP6RIci" target="_blank">
					<img src="https://thumbs2.imgbox.com/d0/55/HhP6RIci_t.jpg" alt="image host" />
				</a>{' '}
				<a href="https://imgbox.com/OunXRmy5" target="_blank">
					<img src="https://thumbs2.imgbox.com/bc/18/OunXRmy5_t.jpg" alt="image host" />
				</a>{' '}
				<a href="https://imgbox.com/tgusVEXz" target="_blank">
					<img src="https://thumbs2.imgbox.com/51/6f/tgusVEXz_t.jpg" alt="image host" />
				</a>{' '}
				<a href="https://imgbox.com/PbG49Y2u" target="_blank">
					<img src="https://thumbs2.imgbox.com/b4/14/PbG49Y2u_t.jpg" alt="image host" />
				</a>{' '}
				<a href="https://imgbox.com/wxdpRDvs" target="_blank">
					<img src="https://thumbs2.imgbox.com/9c/0d/wxdpRDvs_t.jpg" alt="image host" />
				</a>{' '}
				<a href="https://imgbox.com/TaCYBM6S" target="_blank">
					<img src="https://thumbs2.imgbox.com/9d/85/TaCYBM6S_t.jpg" alt="image host" />
				</a>{' '}
				<a href="https://imgbox.com/xAmw8wvM" target="_blank">
					<img src="https://thumbs2.imgbox.com/80/c1/xAmw8wvM_t.jpg" alt="image host" />
				</a>{' '}
				<a href="https://imgbox.com/M3Wq4WOT" target="_blank">
					<img src="https://thumbs2.imgbox.com/22/7c/M3Wq4WOT_t.jpg" alt="image host" />
				</a>
				<p className="ta-c"> We will notify you when your order ships!</p>
				<div className="jc-c">
					<div className="wrap row jc-c max-w-800px">
						<Link to={'/checkout/order/' + props.match.params.id}>
							<button style={{ margin: '15px' }} className="btn primary">
								View Order
							</button>
						</Link>
						<Link to="/collections/all/products">
							<button style={{ margin: '15px' }} className="btn primary">
								Products
							</button>
						</Link>
						<Link to="/pages/featured">
							<button style={{ margin: '15px' }} className="btn primary">
								Featured Videos
							</button>
						</Link>
						<Link to="/pages/music">
							<button style={{ margin: '15px' }} className="btn primary">
								NTRE Music
							</button>
						</Link>
					</div>
				</div>
				<p className="ta-c mv-2rem">
					{' '}
					Make sure to check your spam folder for the confirmation email. If you do not recieve a confirmation
					email please contact support
				</p>
				<h2 className="ta-c">Account Created Successfully</h2>
				<p className="ta-c">Thank you for signing up with glow-leds</p>
			</div>
			<div className="wrap row jc-c w-100per ">
				<Link to="/account/login">
					<button style={{ margin: '15px' }} className="btn primary">
						Login
					</button>
				</Link>
			</div>
		</div>
	);
};
export default OrderPaymentAccountCompletePublicPage;
