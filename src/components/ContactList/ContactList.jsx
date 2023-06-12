import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <div>
      <ul className={css.contact_list}>
        {contacts.map(({ name, number, id }) => {
          return (
            <li key={id} className={css.contact_list_item}>
              <div>
                <span className={css.contact_list_item_name}>
                  {name}: {number}
                </span>

                <button type="button" onClick={() => onDelete(id)}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};
