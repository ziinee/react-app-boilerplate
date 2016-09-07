// @flow

import React, {Component, PropTypes} from 'react';
import List from './List';
import type {CardType, TaskType} from './types.js';

class KanbanBoard extends Component {
  state: {}
  props: {
    cards: CardType[],
  }

  render() : Object {
    return (
      <div className="app">
        <List
          id="todo"
          title="To Do"
          cards={
            this.props.cards.filter((card) => card.status === 'todo')
          }
          />
        <List
          id="in-progress"
          title="In Progress"
          cards={
            this.props.cards.filter((card) => card.status === 'in-progress')
          }
          />
        <List
          id="done"
          title="Done"
          cards={
            this.props.cards.filter((card) => card.status === 'done')
          }
          />
      </div>
    );
  }
}

export default KanbanBoard;
