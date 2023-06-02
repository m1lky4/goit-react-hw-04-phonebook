import { Component } from "react";
import { Contacts } from "./Contacts/Contacts";
import Phonebook from "./Phonebook/Phonebook";

export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };
componentDidMount() {
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts) {
    this.setState({ contacts: JSON.parse(savedContacts) });
  }
}

componentDidUpdate(prevProps, prevState) {
  if (prevState.contacts !== this.state.contacts) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
}

componentWillUnmount() {
  localStorage.removeItem('contacts');
}


  handleParentStateChange = (newContact) => {
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact]
    }));
  };

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const lowerCaseFilter = filter.toLowerCase();
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(lowerCaseFilter);
    });
  };
   handleDeleteContact = (contactId) => {
  const { contacts } = this.state;
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
  this.setState({ contacts: updatedContacts }, () => {
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  });
};

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <Phonebook
          onNewContact={this.handleParentStateChange}
          contacts={this.state.contacts}
        />
        <Contacts
          filteredContacts={this.getFilteredContacts()}
          handleFilterChange={this.handleFilterChange}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
