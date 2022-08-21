import React, { useState, useEffect } from "react";
import Task from "./Task.jsx";

//create your first component
const Home = () => {
	const[tasks,setTasks] = useState([])
	const[text,setText] = useState(null)
	const[render,setRender] = useState(false)
	useEffect(() => {
		const keyDownHandler = (e) => {
		  if (e.key === 'Enter') {
			e.preventDefault();
			document.getElementById("inputTask").value = '';
			var new_tasks = tasks
			new_tasks.push(text)
			setTasks(new_tasks)
			setText("")
		  }
		};
	
		document.addEventListener('keydown', keyDownHandler);
		setRender(true)
		return () => {
		  document.removeEventListener('keydown', keyDownHandler);
		};
	  }, [text]);

	
	const handleClick = (index) => {
		var new_tasks = tasks;
		new_tasks.splice(index,1)
		setTasks(new_tasks)
	}
	
	return (
		<div className="body">
			<div className="paper">
				<div className="inputBox">
					<input id="inputTask" type="text" onChange={(e) => setText(e.target.value)} placeholder="Add a task here..."></input>
				</div>
				{tasks.map((item,index) => <Task text={item} key={index} onClick={() => {handleClick(index)}}/>)}
			</div>
		</div>
	);
};

export default Home;
