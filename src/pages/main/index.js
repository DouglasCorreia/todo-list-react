import React, { Component } from "react";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlipMove from "react-flip-move";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      currentToDo: {
        text: "",
        key: "",
        complete: false,
      },
    };

    this.handleChanged = this.handleChanged.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
    this.completeToDo = this.completeToDo.bind(this);
  }

  componentDidUpdate() {
    localStorage.setItem("toDoList", JSON.stringify(this.state.todos));
  }

  componentDidMount() {
    const todos =
      JSON.parse(localStorage.getItem("toDoList")) || this.state.todos;

    this.setState({
      todos,
    });
  }

  handleChanged = (event) => {
    this.setState({
      currentToDo: {
        text: event.target.value,
        key: Date.now(),
        complete: false,
      },
    });
  };

  addToDo = (event) => {
    event.preventDefault();

    const {
      currentToDo: { text },
    } = this.state;

    if (text.length === 0) {
      alert("Campo vazio!");
      return;
    }

    let newToDo = this.state.currentToDo;

    this.setState((prevState) => ({
      todos: [...prevState.todos, newToDo],
      currentToDo: {
        text: "",
        key: "",
      },
    }));
  };

  deleteToDo = (key) => {
    // Vai percorrer todo o vetor, a key que for igual, irá deletar
    const filteredItems = this.state.todos.filter((todo) => todo.key !== key);

    this.setState({
      todos: filteredItems,
    });
  };

  completeToDo = (key) => {
    const updateToDos = this.state.todos.filter((todo) => {
      if (todo.key === key) {
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
              value={this.state.currentToDo.text}
              onChange={this.handleChanged}
            />

            <input type="submit" value="+" />
          </form>
        </div>

        <div className="lists_activities">
          <FlipMove duration={250} easing="ease-out" style={fullWidth}>
            {todos.map((todo) => (
              <div key={todo.key} className="activities__card">
                <div className="activities__card__info">
                  <div className="activities__card__info--title">
                    <h2>{todo.text}</h2>
                  </div>
                  <div className="activities__card__info__button">
                    <div
                      className={`card__info__button--done ${
                        todo.complete && "complete"
                      }`}
                    >
                      <button onClick={() => this.completeToDo(todo.key)}>
                        <FontAwesomeIcon className="faicons" icon={faCheck} />
                      </button>
                    </div>

                    <div className="card__info__button--delete">
                      <button onClick={() => this.deleteToDo(todo.key)}>
                        <FontAwesomeIcon className="faicons" icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </FlipMove>
        </div>
      </div>
    );
  }
}
