import React, { useState, useEffect , useRef} from "react";
import Task from "./Task.jsx";

//create your first component
const Home = () => {
	const [tasks,setTasks] = useState([])
	const taskNumber = useRef()
	const [text,setText] = useState("")

	//Get TODO's from API
	fetch('http://assets.breatheco.de/apis/fake/todos/user/hayder10')
	.then(response => {
		return response.json()
	})
	.then(data => {
		var tasks = []
		data.forEach((value) => {!value.done ?  tasks.push(value.label) : null})
		setTasks(tasks)
		taskNumber.current = tasks.length
	})
	.catch(error => {
		console.log(error)
	})

	//POST Task to API
	const postTasks = () => {
		var arrayToSend = []
		tasks.map((value) => {
			arrayToSend.push({
				"label" : value,
				"done": false
			})
		})
		
		//Fetch PUT
		fetch('http://assets.breatheco.de/apis/fake/todos/user/hayder10',{
			method: "PUT",
			body: JSON.stringify(arrayToSend),
			headers: {
				"Content-Type": "application/json"
			}
		})
	}


	const handleKeyDown = (e) => {
		if(e.key === "Enter" && text !== ""){
			console.log("submitted")
			console.log(text)
			var new_tasks = tasks
			new_tasks.push(text)
			setText("")
			setTasks(new_tasks)
			postTasks()
		}else if (e.key === "Enter"){
			console.log("Error! Add a task first!")
		}
	}

	const handleClick = (index) => {
		tasks.splice(index,1);
		setTasks([...tasks])
		var arrayToSend = []
		tasks.map((value) => {
			arrayToSend.push({
				"label" : value,
				"done": false
			})
		})
		
		//Fetch PUT
		fetch('http://assets.breatheco.de/apis/fake/todos/user/hayder10',{
			method: "PUT",
			body: JSON.stringify(arrayToSend),
			headers: {
				"Content-Type": "application/json"
			}
		})
		taskNumber.current = tasks.length
	}


	return (
		<div className="body">
			<div className="paper">
				<div className="inputBox">
					<input id="inputTask" type="text" value={text} onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => {setText(e.target.value)}} placeholder="Add a task here..."></input>
				</div>
				{(tasks.length !== 0) ? tasks.map((item,index) => <Task text={item} key={index} onClick={() => {handleClick(index)}}/>) : <div className="emptyTask">No tasks!</div>}
				{(tasks.length !== 0) ? <div className="footer">{taskNumber.current} tasks left...</div> : null}
			</div>
		</div>
	);
};

export default Home;
