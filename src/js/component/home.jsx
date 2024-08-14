import React, { useState} from "react";

//create your first component
// Funcion flecha
const Home = () => {
	// Estados para almacenar la lista de tareas y el nuevo todo a agregar
	const [nuevoTodo, setNuevoTodo] = useState("");
	const [todos, setTodos] = useState(["mi tarea 1", "mi tarea 2"]);

	// Manejador del evento onChange del input
 	// Actualiza el estado `nuevoTodo` con el valor ingresado por el usuario
	const handleChange = (event) => {
		setNuevoTodo(event.target.value);
	 }

	// Función para eliminar una tarea de la lista
	const deleteTodo = (indice) => {
		// Filtra todos los elementos menos el que tenga el indice que recibo
		const listaNueva = todos.filter((todo, i) => i !== indice)
		setTodos(listaNueva);
	}
	// Manejador del evento onKeyDown del input
	// Agrega una nueva tarea a la lista cuando se presiona Enter
	const handlerEnter = (e) => {
		if (e.key === 'Enter' && e.target.value.trim() !== '') {
			setTodos([...todos, nuevoTodo]);
			 // Limpiar el input después de agregar la tarea
			 setNuevoTodo("");
		}
	}

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">
			Todos
			</h1>
			<div className="container bsDanger text-left shadow p-3 mb-5 bg-body rounded">
				<input type="text" className="form-control" onChange={handleChange} onKeyDown={handlerEnter} value={nuevoTodo}/>
				<div className="text-left">
					<ul className="list-group">
						{/* Elementos de la lista */}
						{todos.map((todo, indice) => {
							return(
								<li className="list-group-item d-flex justify-content-between align-items-center text-muted" key={indice}>
									{todo} {" "} 
									<button onClick={() => deleteTodo(indice)}>
										<span> X </span>
									</button>
								</li>
							)
						})}
						<small className="text-black-50"> {todos.length === 0 ? "No tasks, add a task": todos.length + " item left"}</small>
					</ul>
				</div>
				
			</div>
			
		</div>
	);
};

export default Home;
