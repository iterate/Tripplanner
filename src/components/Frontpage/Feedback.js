import React from "react";
import styled from "styled-components";
import Step from "./Step";

const StyledStep = styled(Step)`
	margin: auto;
	color: white;
`;

const Feedback = ({ className }) => (
	<StyledStep
		className={className}
		img={"/images/contact.png"}
		stepHeading={"Contact us"}
		spanTxt={
			"If you need to get in contact with us, just hit us up on tripplanner@iterate.no"
		}
	/>
);

export default Feedback;
