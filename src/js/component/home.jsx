import React, { useEffect, useState} from "react";

//create your first component
// Funcion flecha
const Home = () => {
	// Estados para almacenar la lista de tareas y el nuevo todo a agregar
	const [nuevoTodo, setNuevoTodo] = useState("");
	const [todos, setTodos] = useState([]);


	const [name, setName]= useState("");
	const [usersList, setUsersList]=useState([]);
	const [userDeleted,setUserDeleted] = useState(false);

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

	// ------------- FETCH ------------------------

	function crearUsuario() {

		fetch(`https://playground.4geeks.com/todo/users/${name}`, {
			method: 'POST'

		})
		.then((response) => response.json())
		.then((data)=>{
			if (data.id) {
				alert("Usuario creado con exito")
				setUserDeleted(prev => !prev)
			} else {
				alert("Upps algop salio mal")
			}
		})
		.catch((error)=>console.log(error))

	}
	
	function deleteUser(){
		fetch(`https://playground.4geeks.com/todo/users/${name}`,{
			method: "DELETE"
		})
		.then((data)=>{
			// console.log("este es la data: ", data);
			if (data.ok){
				alert("Usuario eliminado con exito")
				setUserDeleted(prev => !prev)
			}else {
				alert("algo salio mal")
			}
		})
	}

	const getUsers=()=>{
		fetch("https://playground.4geeks.com/todo/users")
		.then((response)=>response.json())
		.then((data)=>setUsersList(data.users))
	}

	useEffect(()=>{
		getUsers()
	},[userDeleted])


	useEffect(() => {
		console.log("info ejemplo guardadas", todos);
	}, [todos]);

	const getTasks =()=> {
		console.log("Este es el nombre de la agenda que se esta buscando",name)
		fetch(`https://playground.4geeks.com/todo/users/${name}`)
		
		.then((response)=>{
			console.log("Este es el response",response)
			return response.json()
		})
		.then((data)=> {
			console.log("data ejemplo",data)
			console.log("pedido de textos",data.todos)
			if (data.todos) {
				setTodos(data.todos)
			}
		})
	}


	const createTasks = () => {
		 // Obtener el nuevo valor de la tarea y el nombre de usuario
		const newTask = { label: nuevoTodo, is_done: false };
		const userName = name;
		// Validar el valor de la nueva tarea
		if (!newTask.label.trim()) {
		  alert('Introduzca una descripción válida de la tarea.');
		  return;
		}
		// Enviar la petición POST usando fetch
		fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		  },
		  body: JSON.stringify(newTask)
		})
		.then(response => response.json())
		.then(data => {
		  // Manejar respuesta exitosa (201 Creado)
		  if (data.id) {
			setTodos([...todos, data]);
			setNuevoTodo('');
			alert('¡Tarea creada con éxito!');
		  } else {
			// Gestionar posibles errores de validación
			console.error('Error de validación:', data);
			alert('Error en la creación de la tarea. Compruebe los datos introducidos.');
		  }
		})
		.catch(error => {
		  console.error('Error al crear la tarea:', error);
		  alert('Se ha producido un error inesperado. Vuelva a intentarlo más tarde.');
		});
	  };

	  const deleteTask = (taskId) => {
		const url = `https://playground.4geeks.com/todo/todos/${taskId}`;
	  
		fetch(url, {
		  method: 'DELETE',
		})
		.then(response => {
		  if (!response.ok) {
			throw new Error('Error al eliminar la tarea');
		  }
		  return response.json();
		})
		.then(data => {
		  // Actualizar el estado local para reflejar la eliminación
		  setTodos(todos.filter(todo => todo.id !== taskId));
		  console.log('Tarea eliminada con éxito:', data);
		})
		.catch(error => {
		  console.error('Error al eliminar la tarea:', error);
		  // Mostrar un mensaje de error al usuario
		  alert('No se pudo eliminar la tarea. Por favor, inténtalo de nuevo más tarde.');
		});
	  };



	return (
		<div className="text-center">
			<input type="text" onChange={(e)=>setName(e.target.value)} />
			<button onClick={crearUsuario}>Crear Usuario</button>
			<button onClick={deleteUser}>Eliminar Usuario</button>
			<button onClick={getTasks}>Obtener Tareas</button>
			<button onClick={createTasks}>Crear Tareas</button>
			<button onClick={deleteTask}>Eliminar Tareas</button>
			<label>Lista de usuarios</label>
			{
				usersList.map((item,index)=>{
					return(
						<h5 key={index}>{item.name}</h5>
					)
				})
			}
	
			<h1 className="text-center mt-5">
			Todos
			</h1>
			<div className="container bsDanger text-left shadow p-3 mb-5 bg-body rounded lead">
				<input type="text" className="form-control" onChange={handleChange} onKeyDown={handlerEnter} value={nuevoTodo} placeholder="What needs to be done?"/>
				<div className="text-left">
					<ul className="list-group">
						{/* Elementos de la lista */}
						{todos.map((todo) => {
							return(
								<li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center text-muted" >
									{todo.label} {" "} 
									<button onClick={() => deleteTask(todo.id)}>
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
