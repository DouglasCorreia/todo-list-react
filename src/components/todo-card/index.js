import React, { Component } from "react";

import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Todo extends Component {
    render() {
        return (
            <div className="activities__card">
                <div className="activities__card__info">
                    <div className="activities__card__info--title">
                        <h2>{this.props.text}</h2>
                    </div>
                    <div className="activities__card__info__button">
                        <div
                            className={`card__info__button--complete ${
                                this.props.completed && "complete"
                                }`}
                        >
                            <button onClick={() => this.props.completeToDo(this.props.id)}>
                                <FontAwesomeIcon className="faicons" icon={faCheck} />
                            </button>
                        </div>

                        <div className="card__info__button--delete">
                            <button onClick={() => this.props.deleteToDo(this.props.id)}>
                                <FontAwesomeIcon className="faicons" icon={faTrash} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}