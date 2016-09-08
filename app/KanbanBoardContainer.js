// @flow

import React, { Component } from 'react';
import update from 'react-addons-update';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import 'babel-polyfill';
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
      this.setState({cards: responseData})
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });

    window.state = this.state;
  }

  addTask(cardId: number, taskName: string) {

    // 낙관적인 UI 변경을 되돌려야 하는 경우를 대비해 변경하기 전 원래 상태에 대한 참조 저장
    let prevState = this.state;

    // 카드의 인덱스를 찾는다.
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

    // 저장된 이름과 임시 ID로 새로운 태스크를 생성한다.
    let newTask: {id: number, name: string, done: boolean} =
      {id:Date.now(), name:taskName, done:false};

    // 새로운 객체를 생성하고 태스크의 배열로 새로운 태스크를 푸시한다.
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$push: [newTask]}
      }
    });

    // 변경된 객체로 컴포넌트 상태를 설정한다.
    this.setState({cards:nextState});

    // API를 호출해 서버에 해당 태스크를 추가한다.
    fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
    .then((response) => {
      if (response.ok) {
        response.json()
      } else {

        // 서버 응답이 정상이 아닌 경우 오류를 생성해 UI에 낙관적인 변경을 원래로 되돌린다.
        throw new Error("Server response wasn't OK")
      }
    })
    .then((responseData) => {
      // 서버가 새로운 태스크를 추가하는 데 이용한
      // 확정 ID를 반환하면 리액트에서 ID를 업데이트한다.
      if (! responseData) {
        return null;
      }
      newTask.id = responseData.id;
      this.setState({cards:nextState});
    })
    .catch((error) => {
      this.setState(prevState);
    });
  }

  deleteTask(cardId: number, taskId: number, taskIndex: number) {

    // 카드의 인덱스를 찾는다.
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

    // 낙관적인 UI 변경을 되돌려야 하는 경우를 대비해 변경하기 전 상태에 대한 참조를 저장
    let prevState = this.state;

    // 해당 태스크를 제외한 새로운 객체를 생성한다.
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$splice: [[taskIndex, 1]]}
      }
    });

    // 변경된 객체로 컴포넌트 상태를 설정한다.
    this.setState({cards: nextState});

    // API를 호출해 서버에서 해당 태스크를 제거한다.
    console.log('테스트');
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: API_HEADERS,
    });

  }

  toggleTask(cardId: number, taskId: number, taskIndex: number) {

    // 낙관적인 UI 변경을 되돌려야 하는 경우를 대비해 변경 전 원래 상태에 대한 참조를 저장
    let prevState = this.state;

    // 카드의 인덱스를 찾는다.
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

    // 태스크의 'done' 값에 대한 참조를 저장한다.
    let newDoneValue;

    // $apply 명령을 이용해 done 값을 현재와 반대로 변경한다.
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          [taskIndex]: {
            done: {$apply: (done) => {
                newDoneValue = ! done
                return newDoneValue;
              }
            }
          }
        }
      }
    });

    // 변경된 객체로 컴포넌트 상태를 설정한다.
    this.setState({cards: nextState});

    // API를 호출해 서버에서 해당 태스크를 토글한다.
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'PUT',
      headers: API_HEADERS,
      body: JSON.stringify({done: newDoneValue})
    })
    .then((response) => {
      if (! response.ok) {
        // 서버 응답이 정상이 아닌경우 오류를 생성해 UI에 대한 낙관적인 변경을 원래로 되돌린다.
        throw new Error("Server response wasn't OK");
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      this.setState(prevState);
    });
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
