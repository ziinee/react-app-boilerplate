// @flow

import React, {Component, PropTypes} from 'react';
import List from './List';
import type {CardType, TaskType, TaskCallbackType} from './types.js';

class KanbanBoard extends Component {
  state: {}
  props: {
    cards: CardType[],
    taskCallbacks: TaskCallbackType,
  }

  render() : Object {
    return (
      <div className="app">
        <List
          id="todo"
          title="To Do"
          taskCallbacks={
            this.props.taskCallbacks
          }
          cards={
            this.props.cards.filter((card) => card.status === 'todo')
          }
          />
        <List
          id="in-progress"
          title="In Progress"
          taskCallbacks={
            this.props.taskCallbacks
          }
          cards={
            this.props.cards.filter((card) => card.status === 'in-progress')
          }
          />
        <List
          id="done"
          title="Done"
          taskCallbacks={
            this.props.taskCallbacks
          }
          cards={
            this.props.cards.filter((card) => card.status === 'done')
          }
          />
      </div>
    );
  }
}

export default KanbanBoard;
