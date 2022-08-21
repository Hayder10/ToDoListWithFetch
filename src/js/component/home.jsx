import React, { useState, useEffect } from "react";
import Task from "./Task.jsx";

//create your first component
const Home = () => {
	const[tasks,setTask] = useState([])
	const[text,setText] = useState("")

	const handleChange = (e) => {
		setText(e.target.value)
	}

	const handleNewTask = () => {
		var new_tasks = tasks
		var text_to_add = text
		setTask(new_tasks)
	}

	useEffect(() => {
		const keyDownHandler = (e) => {
		  if (e.key === 'Enter') {
			e.preventDefault();
			handleSubmit();
		  }
		};
	
		document.addEventListener('keydown', keyDownHandler);
	
		return () => {
		  document.removeEventListener('keydown', keyDownHandler);
		};
	  }, []);


	const handleSubmit = (text) => {
		console.log(text)
		handleNewTask();
	}

	var text_to_add = text
	
	return (
		<div className="body">
			<div className="paper">
				<div className="inputBox">
					<input type="text" onSubmit={() => handleSubmit()} onChange={(e) => handleChange(e)} placeholder="Add a task here..."></input>
				</div>
				<Task text={"Test 1"}/>
			</div>
	
		</div>
	);
};

export default Home;
