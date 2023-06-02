import s from '../Phonebook.module.css';

export const Contacts = ({
  handleFilterChange,
  filteredContacts,
  onDeleteContact,
}) => {
  return (
    <div className={s.ContactsWrapper}>
      <h4>Contacts</h4>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        type="text"
        name="filter"
        placeholder="Search contacts"
        onChange={handleFilterChange}
        className={s.Input}
      />
      <ul>
        {filteredContacts.map(el => (
          <li className={s.ContactsItem} key={el.id}>
            {' '}
            {el.name}: {el.number}
            <button
              type="button"
              className={s.DeleteBtn}
              onClick={() => {
                onDeleteContact(el.id);
              }}
            >
              Delete Contact
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
