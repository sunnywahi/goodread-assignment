import "./style.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import {render} from "react-dom";

import BookStatistics from "./components/BookStatistics.jsx";
import BookList from "./components/BookList.jsx";


const App = () => {
	return (
		<div>
			<BookStatistics />
			<hr/>
			<BookList />
		</div>
	);
}

render(<App/>, 
	document.getElementById("root")
);
