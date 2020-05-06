import React, { Component } from "react";
import FlipMove from "react-flip-move";

import Todo from "../../components/todo-card";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      inputText: "",
    };

    this.handleChanged = this.handleChanged.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
    this.completeToDo = this.completeToDo.bind(this);
  }

  // Toda vez que o DOM for alterado, recuperá o state atual e amarzenar no local storage.
  componentDidUpdate() {
    localStorage.setItem("toDoList", JSON.stringify(this.state.todos));
  }

  // Quando o DOM estiver pronto, irá recuperar o state armazenado no local storage e apresentar na página.
  componentDidMount() {
    const todos =
      JSON.parse(localStorage.getItem("toDoList")) || this.state.todos;

    this.setState({
      todos,
    });
  }

  handleChanged = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  addToDo = (event) => {
    event.preventDefault();

    const { inputText } = this.state;

    if (inputText.length === 0) {
      alert("Campo vazio!");
      return;
    }

    let newToDo = {
      text: this.state.inputText,
      id: Date.now(),
      complete: false,
    };

    this.setState((prevState) => ({
      todos: [...prevState.todos, newToDo],
      inputText: "",
    }));
  };

  deleteToDo = (id) => {
    // Vai percorrer todo o vetor, a id que for igual, irá deletar
    const filteredItems = this.state.todos.filter((todo) => todo.id !== id);

    this.setState({
      todos: filteredItems,
    });
  };

  completeToDo = (id) => {
    // Vai percorrer todo o vetor, a id que for igual, irá alterar a key complete para true
    const updateToDos = this.state.todos.filter((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }

      return todo;
    });

    this.setState({
      todos: updateToDos,
    });
  };

  render() {
    const { todos } = this.state;

    let fullWidth = { width: "100%" };

    return (
      <div className="lists">
        <div className="lists__form">
          <form onSubmit={this.addToDo}>
            <input
              type="text"
              value={this.state.inputText}
              onChange={this.handleChanged}
            />

            <input type="submit" value="+" />
          </form>
        </div>

        <div className="lists_activities">
          <FlipMove duration={250} easing="ease-out" style={fullWidth}>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.complete}
                completeToDo={this.completeToDo}
                deleteToDo={this.deleteToDo}
              />
            ))}
          </FlipMove>
        </div>
      </div>
    );
  }
}
