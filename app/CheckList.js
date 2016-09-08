// @flow

import React, {Component, PropTypes} from 'react';
import type {TaskType, TaskCallbackType} from './types.js';

class CheckList extends Component {
  state: {}
  props: {
    cardId: number,
    tasks: TaskType[],
    taskCallbacks: TaskCallbackType,
  }

  checkInputKeyPress(event: Object) : void {
    if (event.key === 'Enter') {
      this.props.taskCallbacks.add(
        this.props.cardId, event.target.value
      );
      event.target.value='';
    }
  }

  render() : Object {
    let tasks = this.props.tasks.map((task, taskIndex) => (
      <li
        key={task.id}
        className="checklist__task">
        <input
          type="checkbox"
          checked={task.done}
          onChange={this.props.taskCallbacks.toggle.bind(
            null, this.props.cardId, task.id, taskIndex
          )} />
          {task.name}{' '}
        <a
          href="#"
          className="checklist__task--remove"
          onClick={this.props.taskCallbacks.delete.bind(
            null, this.props.cardId, task.id, taskIndex
          )} />
      </li>
    ));
    return (
      <div className="checklist">
        <ul>{tasks}</ul>
        <input
          type="text"
          className="checklist--add-task"
          placeholder="Type then hit Enter to add a task"
          onKeyPress={this.checkInputKeyPress.bind(this)} />
      </div>
    );
  }
}

export default CheckList;
