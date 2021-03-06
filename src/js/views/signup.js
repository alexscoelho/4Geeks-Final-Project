import React, { useState, useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

// react-components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
// import Modal from "react-bootstrap/Modal";

// import { ShowModal } from "../component/modal";

export const SignUp = props => {
	const { store, actions } = useContext(Context);
	let history = useHistory();

	const [firstName, setFirstName] = useState("");
	const [lasttName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [accountType, setAccountType] = useState("");
	const [language, setLanguage] = useState("");

	// form validation
	// const [validated, setValidated] = useState(false);

	async function handleSubmit(e) {
		// form Validation for all fields
		const form = e.currentTarget;
		if (form.checkValidity() === true) {
			e.preventDefault();
			// e.stopPropagation();

			// setmore api customer
			let customer = {
				first_name: firstName,
				last_name: lasttName,
				email_id: email
			};

			let createCustomer = await actions.createCustomer(customer);
			console.log("customer", createCustomer);
			if (createCustomer instanceof Error === false) {
				let user = {
					first_name: firstName,
					last_name: lasttName,
					email: email,
					password: password,
					account_type: accountType,
					language: language,
					customer_id: createCustomer.data.customer.key
				};

				let req = await actions.createUser(user); // the is asynchronous, the fetch is in store
				// call the message buffer
				console.log("req", req);
				//to set message according to fetch
				if (req[0] === "Success") {
					actions.setMessage({
						visible: true,
						type: "success",
						heading: "Success!",
						errorMessage: "User Created, now you can login"
					});
					history.push("/login");
				} else {
					actions.setMessage({
						visible: true,
						type: "danger",
						heading: "Oops!",
						errorMessage: req.message
					});
				}
			}
		}
		// setValidated(true);
	}

	return (
		<div className="container pb-4 pt-4 m-auto">
			<div className=" w-50 m-auto">
				<h2>Sign up</h2>
				<div className="d-flex">
					<p>Already have an account?</p>
					<Link to="/login">
						<a className="ml-2" href="#">
							{" "}
							Login
						</a>
					</Link>
				</div>
			</div>
			<div className=" w-50 form-wrapper m-auto">
				<Form onSubmit={e => handleSubmit(e)}>
					<Form.Row className="d-block d-lg-flex">
						<Form.Group as={Col} controlId="formGridEmail">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								required
								onChange={e => setFirstName(e.target.value)}
								type="text"
								placeholder="Enter First Name"
							/>
							<Form.Control.Feedback type="invalid">Please provide a name.</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridPassword">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								required
								onChange={e => setLastName(e.target.value)}
								type="text"
								placeholder="Enter Last Name"
							/>
						</Form.Group>
					</Form.Row>

					<Form.Group controlId="formGridAddress1">
						<Form.Label>Email</Form.Label>
						<Form.Control
							required
							onChange={e => setEmail(e.target.value)}
							type="email"
							placeholder="Email"
						/>
					</Form.Group>

					<Form.Row className="d-block d-lg-flex">
						<Form.Group as={Col} controlId="formGridEmail">
							<Form.Label>Language</Form.Label>
							<Form.Control
								required
								onChange={e => setLanguage(e.target.value)}
								type="text"
								placeholder="Enter Language"
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridState">
							<Form.Label>Account Type</Form.Label>
							<Form.Control
								required
								onChange={e => setAccountType(e.target.value)}
								as="select"
								defaultValue="Choose...">
								<option />
								<option>Teacher</option>
								<option>Student</option>
							</Form.Control>
						</Form.Group>
					</Form.Row>

					<Form.Row className="d-block d-lg-flex">
						<Form.Group as={Col} controlId="formGridCity">
							<Form.Label>Password</Form.Label>
							<Form.Control required onChange={e => setPassword(e.target.value)} type="password" />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridZip">
							<Form.Label> Confirm Password</Form.Label>
							<Form.Control required type="password" />
						</Form.Group>
					</Form.Row>

					{/* <Form.Group id="formGridCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group> */}

					<Button variant="primary" type="submit">
						Sign Up
					</Button>
				</Form>
			</div>
		</div>
	);
	SignUp.propTypes = {
		successMessage: PropTypes.string,
		errorMessage: PropTypes.string
	};
};
