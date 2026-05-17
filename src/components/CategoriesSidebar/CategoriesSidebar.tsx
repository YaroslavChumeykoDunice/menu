import type { Category } from '../../store/categoryStore';
import { useMenuStore } from '../../store/menuStore';
import styles from './CategoriesSidebar.module.css';

interface Props {
  categories: Category[];

  activeCategoryId: number | null;
  onCreateCategory?: () => void;

  onSelect: (
    categoryId: number | null
  ) => void;
}

const CategoriesSidebar = ({
  categories,
  activeCategoryId,
  onSelect,
  onCreateCategory
}: Props) => {
  const { items } = useMenuStore();
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        Категории
      </h3>
      <div className={styles.helperButtons}>
        <button
        className={styles.createButton}
        onClick={onCreateCategory}
      >
        + Новая категория
      </button>
      <button
        className={`${styles.categoryButton} ${activeCategoryId === null
            ? styles.active
            : ''
          }`}
        onClick={() => onSelect(null)}
      >
        <span>Все категории</span>

        <span className={styles.count}>
          {items.length}
        </span>
      </button>
      </div>
      <div className={styles.list}>
        {categories.map(category => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${activeCategoryId ===
                category.id
                ? styles.active
                : ''
              }`}
            onClick={() =>
              onSelect(category.id)
            }
          >
            <span>
              {category.name}
            </span>

            <span className={styles.count}>
              {items.filter(item => item.category?.id === category.id).length}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSidebar;