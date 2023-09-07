import * as React from "react";
import { Link } from "react-router-dom";
import { LazyImage } from "../../../shared/SharedComponents";

const TeamSmallScreen = ({ team, style }) => {
  return (
    <li key={team._id} className=" w-100per" style={style}>
      <Link to={`/collections/all/teams/${team && team.pathname}`}>
        <div className="small_screen_product row">
          <div className="">
            <LazyImage
              className="sponsor-image max-w-400px max-h-400px w-100per h-auto br-10px pr-1rem"
              alt={team.team_name}
              title="Affiliate Image"
              effect="blur"
              size={{ height: "auto", width: "100%" }}
              src={team.picture}
            />
          </div>
          <div className="column jc-b w-200px">
            <label style={{ fontSize: "2rem", WebkitTextStroke: "1.5px white" }} className="pv-1rem">
              {team.team_name}
            </label>
            <div className="column jc-b ">
              {/* <label style={{ fontSize: '1.6rem' }} className="pv-10px">
								{team.user && team.user.first_name}{' '}
								{team.user && team.user.last_name}
							</label> */}

              {/* <label style={{ fontSize: '1.6rem' }}>{team.location}</label> */}
              {/* <div className="mt-2rem wrap  ">
								<div className="fs-25px jc-fs w-100per max-w-500px ai-c">
									<div className="fs-40px">
										<a
											href={'https://www.facebook.com/' + team.facebook_name}
											target="_blank"
											rel="noopener noreferrer"
										>
											<i className="fab fa-facebook zoom" />
										</a>
									</div>
									<div className="ml-10px fs-40px">
										<a
											href={'https://www.facebook.com/' + team.instagram_handle}
											target="_blank"
											rel="noopener noreferrer"
										>
											<i className="fab fa-instagram zoom" />
										</a>
									</div>
								</div>
							</div> */}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default TeamSmallScreen;

// <li key={team._id} className=" w-100per" style={style}>
// 			<Link to={`/collections/all/teams/${team && team.pathname}`}>
// 				<div className="small_screen_product row">
// 					<div className="">
// 						<LazyImage
// 							className="team-image w-200px h-auto br-10px"
// 							alt={team.team_name}
// 							title="Team Image"
// 							effect="blur"
// 							src={team.picture}
// 						/>
// 						{/* <LazyLoadImage
// 							className="team-image w-200px h-auto br-10px"
// 							alt={team.team_name}
// 							title="Team Image"
// 							effect="blur"
// 							src={
// 								category.toLowerCase() === 'glovers' ? (
// 									`http://img.youtube.com/vi/${team.video}/hqdefault.jpg`
// 								) : (
// 									team.logo
// 								)
// 							}
// 						/> */}
// 					</div>
// 					<div className="p-10px">
// 						<div className="product_text" style={{ fontSize: '1.6rem' }}>
// 							{team.team_name}
// 						</div>
// 						{/* <label style={{ fontSize: '1.3rem' }}>
// 							{team.product && humanize(team.product)}
// 						</label> */}
// 					</div>
// 				</div>
// 			</Link>
// 		</li>
