// @flow

import React, {Component, PropTypes} from 'react';
import CheckList from './CheckList';
import marked from 'marked';
import type {CardType, TaskType, TaskCallbackType} from './types.js'

let titlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    let value = props[propName];
    if (typeof value !== 'string' || value.length > 80) {
      return new Error(
        '${propName} in ${componentName} is longer than 80 characters'
      );
    }
  }
};

class Card extends Component {
  state: {
    showDetails: boolean,
  }
  props: {
    id: number,
    title: string,
    description: string,
    color: string,
    status: string,
    tasks: TaskType[],
    taskCallbacks: TaskCallbackType,
  }

  constructor() : void {
    super(...arguments);
    this.state = {
      showDetails: false
    };
  }

  toggleDetails() : void {
    this.setState({showDetails: !this.state.showDetails});
  }

  render() : Object {
    let cardDetails;
    if (this.state.showDetails) {
      cardDetails = (
        <div className="card__details">
          <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
          <CheckList
            cardId={this.props.id}
            tasks={this.props.tasks}
            taskCallbacks={this.props.taskCallbacks}/>
        </div>
      );
    }

    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    };

    return (
      <div className="card">
        <div style={sideColor}/>
        <div className={
          this.state.showDetails? 'card__title card__title--is-open' : 'card__title'
        } onClick={this.toggleDetails.bind(this)}>
        {this.props.title}
        </div>
        {cardDetails}
      </div>
    );
  }
}

export default Card;
