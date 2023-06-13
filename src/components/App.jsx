import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const CONTACTS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const loacalContacts = JSON.parse(localStorage.getItem(CONTACTS_KEY));
    if (loacalContacts) {
      setContacts([...loacalContacts]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const addContact = contact => {
    const isContactIncuded = contacts.some(({ name }) => {
      return name === contact.name;
    });

    if (isContactIncuded) {
      alert(`${contact.name} is already in contacts`);
    } else {
      const newContact = { ...contact, id: nanoid() };
      setContacts(contacts => [newContact, ...contacts]);
    }
  };

  const contactDelete = contactId => {
    setContacts(contacts =>
      contacts.filter(({ id }) => {
        return id !== contactId;
      })
    );
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(({ name }) => {
    return name.toLowerCase().includes(normalizedFilter);
  });

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter changeFilter={changeFilter} value={filter} />
      <ContactList contacts={filteredContacts} onDelete={contactDelete} />
    </div>
  );
};
