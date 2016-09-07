// @flow

// 타입 힌트를 지정

/*
// 자바스크립트
// 동적 타입 언어
// 약한 타입 언어

function string_concat (a: string, b: string): string {
  return a + b;
}

function concat (a: string | number, b: string | number): string | null {
  if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  }
  if (typeof a === 'number' && typeof b === 'number') {
    return a.toString() + b.toString();
  }
  return null;
}


// 자바
// 정적 타입 언어
// 강한 타입 언어

String string_concat (String a, String b) {
  return a + b;
}
*/

import React, { Component, PropTypes } from 'react';
import 'whatwg-fetch';

type ContactType = {
  name: string,
  email: string,
}

// 주 컴포넌트이며 SearchBar와 ContactList를 렌더링

class ContactsAppContainer extends Component {
  state: {
    contacts: ContactType[],
  }
  prpos: {}

  constructor(): void {
    super();
    this.state={
      contacts: []
    };
  }

  componentDidMount (): void {
    fetch('./contacts.json')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({contacts: responseData});
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() : Object {
    return (
      <ContactsApp contacts={this.state.contacts} />
    );
  }
}


class ContactsApp extends Component {
  state: {
    filterText: string,
  }
  props: {
    contacts: ContactType[],
  }

  constructor(): void {
    super();
    this.state={
      filterText: ''
    };
  }

  handleUserInput(searchTerm): void {
    this.setState({filterText: searchTerm});
  }

  render() : Object {
    return(
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput.bind(this)}
          />
        <ContactList contacts={this.props.contacts}
          filterText={this.state.filterText} />
      </div>
    );
  }
}


class SearchBar extends Component {
  state: {}
  props: {
    onUserInput: (event: string) => void,
    filterText: string,
  }

  handleChange(event) : void {
    this.props.onUserInput(event.target.value);
  }

  render() : Object {
    return (
      <input type="search"
              placeholder="search"
              value={this.props.filterText}
              onChange={this.handleChange.bind(this)}/>
    );
  }
}


class ContactList extends Component {
  state: {}
  props: {
    filterText: string,
    contacts: ContactType[],
  }

  render() : Object {
    let filteredContacts = this.props.contacts.filter(
      (contact) => contact.name.indexOf(this.props.filterText) !== -1
    );
    return(
      <ul>
        {filteredContacts.map(
          (contact) => <ContactItem key={contact.email}
                                    name={contact.name}
                                    email={contact.email} />
        )}
      </ul>
    );
  }
}


class ContactItem extends Component {
  state: {}
  props: ContactType

  render() : Object {
    return (
      <li>{this.props.name} - {this.props.email}</li>
      );
  }
}


export default {ContactsAppContainer};
