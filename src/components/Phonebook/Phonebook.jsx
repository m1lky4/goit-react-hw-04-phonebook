import { useState } from 'react';
import { nanoid } from 'nanoid';
import s from '../Phonebook.module.css';

export const Phonebook = ({ contacts, onNewContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (nameExists) {
      alert('Contact with the same name already exists!');
    } else {
      const contact = { id: nanoid(), name, number };
      onNewContact(contact);
      setName('');
      setNumber('');
    }
  };

  return (
    <form className={s.Form} onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([ '\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
        className={s.Input}
      />
      <label htmlFor="number">Number</label>
      <input
        type="tel"
        name="number"
        required
        onChange={handleChange}
        className={s.Input}
      />

      <button type="submit" className={s.AddBtn}>
        Add contact
      </button>
    </form>
  );
};
