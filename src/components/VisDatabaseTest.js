import React from "react";

const VisDatabaseTest = props => {
	console.log("database", props.database);
	console.log(
		props.database.addMarkerListener("qwert", v =>
			console.log("log in callback", v)
		)
	);
	return <div />;
};

export default VisDatabaseTest;
