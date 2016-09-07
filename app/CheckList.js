// @flow

import React, {Component, PropTypes} from 'react';
import type {TaskType} from './types.js';

class CheckList extends Component {
  state: {}
  props: {
    cardId: number,
    tasks: TaskType[],
  }

  render() : Object {
    let tasks = this.props.tasks.map((task) => (
      <li key={task.id} className="checklist__task">
        <input type="checkbox" defaultChecked={task.done}/> {task.name}{' '}
        <a href="#" className="checklist__task--remove"/>
      </li>
    ));
    return (
      <div className="checklist">
        <ul>{tasks}</ul>
        <input type="text" className="checklist--add-task" placeholder="Type then hit Enter to add a task"/>
      </div>
    );
  }
}

export default CheckList;
