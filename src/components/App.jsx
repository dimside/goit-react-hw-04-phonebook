import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const CONTACTS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(CONTACTS_KEY));
    if (contacts) {
      this.setState({ contacts: [...contacts] });
    }
  }

  componentDidUpdate(prevProps, { contacts }) {
    if (contacts !== this.state.contacts) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  changeFilter = ({ target: { value } }) => {
    this.setState({
      filter: value,
    });
  };

  addContact = contact => {
    const isContactIncuded = this.state.contacts.some(({ name }) => {
      return name === contact.name;
    });

    if (isContactIncuded) {
      alert(`${contact.name} is already in contacts`);
    } else {
      const newContact = { ...contact, id: nanoid() };
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    }
  };

  contactDelete = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(({ id }) => {
        return id !== contactId;
      }),
    });
  };

  render() {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter changeFilter={this.changeFilter} value={filter} />
        <ContactList
          contacts={filteredContacts}
          onDelete={this.contactDelete}
        />
      </div>
    );
  }
}
