// @flow

import React, {Component, PropTypes} from 'react';
import Card from './Card';
import type {CardType, TaskType, TaskCallbackType} from './types.js'

class List extends Component {
  state: {}
  props: {
    id: string,
    title: string,
    cards: CardType[],
    taskCallbacks: TaskCallbackType,
  }

  render() : Object {
    let cards = this.props.cards.map((card) => {
      return (
        <Card
          key={card.id}
          taskCallbacks={this.props.taskCallbacks}
          {...card}
          />
      );
    });

    return (
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
}

export default List;
