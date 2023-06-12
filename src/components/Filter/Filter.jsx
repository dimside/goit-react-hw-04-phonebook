import PropTypes from 'prop-types';
import css from './Filter.module.css'

export const Filter = ({ value, changeFilter }) => {
  return (
    <div className={css.filter}>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={value}
        onChange={changeFilter}
        className={css.filter_input}
      />
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};
