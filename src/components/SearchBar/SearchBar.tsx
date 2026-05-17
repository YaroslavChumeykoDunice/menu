import styles from './SearchBar.module.css';

interface Props {
  value: string;

  onChange: (
    value: string
  ) => void;
}

const SearchBar = ({
  value,
  onChange,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder="Поиск рецептов..."
        value={value}
        onChange={e =>
          onChange(e.target.value)
        }
        className={styles.input}
      />

      {value && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={() => onChange('')}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;