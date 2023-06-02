import { Component } from "react";
import { nanoid } from "nanoid";
import s from '../Phonebook.module.css'
export default class Phonebook extends Component {
  state = {
    name: '',
    number: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const { onNewContact, contacts } = this.props;

    const nameExists = contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase());

    if (nameExists) {
      alert('Contact with the same name already exists!');
    } else {
      const contact = { id: nanoid(), name, number };
      onNewContact(contact);
      this.setState({ name: '', number: '' });
    }
  };

  render() {
    return (
      <form className={s.Form} onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.handleChange}
          className={s.Input}
        />
        <label htmlFor="number">Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.handleChange}
          className={s.Input}
        />
        <button type="submit" className={s.AddBtn}>Add contact</button>
      </form>
    );
  }
}
