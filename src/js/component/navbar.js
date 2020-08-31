import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

// react-bootstrap

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	let { username, userType, loggedIn } = store.user;
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link to="/">
				<a className="navbar-brand" href="#">
					Music School
				</a>
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<span className="navbar-toggler-icon" />
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav ml-auto ">
					{!loggedIn ? (
						<li className="nav-item">
							<Link to="/signup">
								<a className="nav-link " href="#">
									Sign up <span className="sr-only">(current)</span>
								</a>
							</Link>
						</li>
					) : null}
					{!loggedIn ? (
						<li className="nav-item">
							<Link to="/login">Login</Link>
						</li>
					) : null}

					{loggedIn ? (
						<li className="nav-item">
							<Link to="/">Logout</Link>
						</li>
					) : null}

					<li className="nav-item">
						<a className="nav-link " href="#">
							Donate
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};
