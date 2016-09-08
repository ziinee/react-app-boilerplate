// @flow

import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch'
import type {CardType, TaskType} from './types';

// 서버를 로컬에서 실행하는 경우 기본 URL은 localhost:3000 이며
// 로컬 서버에는 권한 부여 헤더가 필요 없다.
const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'any-string-you-like' // 로컬 서버의 경우 권한 부여가 필요 없다.
}

class KanbanBoardContainer extends Component {
  state: {
    cards: CardType[],
  }
  props: {}

  constructor() : void {
    super(...arguments);
    this.state = {
      cards: [],
    };
  }

  componentDidMount() : void {
    fetch(API_URL+'/cards', {headers: API_HEADERS})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({cards: responseData});
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }

  addTask(cardId, taskName) {

  }

  deleteTask(cardId, taskId, taskIndex) {

  }

  toggleTask(cardId, taskId, taskIndex){

  }

  render() : Object {
    return (
      <KanbanBoard cards={this.state.cards}
        taskCallbacks={{
          toggle: this.toggleTask.bind(this),
          delete: this.deleteTask.bind(this),
          add: this.addTask.bind(this) }}/>
    );
  }
}

export default KanbanBoardContainer;
