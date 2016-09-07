// @flow

import React, {Component, PropTypes} from 'react';
import Card from './Card';
import type {CardType, TaskType} from './types.js'

class List extends Component {
  state: {}
  props: {
    id: string,
    title: string,
    cards: CardType[],
  }

  render() : Object {
    let cards = this.props.cards.map((card) => {
      return (
        <Card key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
          color={card.color}
          tasks={card.tasks}
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
