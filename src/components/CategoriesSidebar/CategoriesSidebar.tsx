import type { Category } from '../../store/categoryStore';

import { useMenuStore } from '../../store/menuStore';

import styles from './CategoriesSidebar.module.css';

interface Props {
  categories: Category[];

  activeCategoryIds: number[];

  onCreateCategory?: () => void;

  onSelect: (
    categoryIds: number[]
  ) => void;
}

const CategoriesSidebar = ({
  categories,
  activeCategoryIds,
  onSelect,
  onCreateCategory,
}: Props) => {
  const { items } = useMenuStore();

  const toggleCategory = (
    categoryId: number
  ) => {
    // если категория уже выбрана -> убираем
    if (
      activeCategoryIds.includes(
        categoryId
      )
    ) {
      onSelect(
        activeCategoryIds.filter(
          id => id !== categoryId
        )
      );

      return;
    }

    // иначе добавляем
    onSelect([
      ...activeCategoryIds,
      categoryId,
    ]);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        Категории
      </h3>

      <div
        className={
          styles.helperButtons
        }
      >
        <button
          className={
            styles.createButton
          }
          onClick={
            onCreateCategory
          }
        >
          + Новая категория
        </button>

        {/* ALL */}

        <button
          className={`${styles.categoryButton} ${
            !activeCategoryIds.length
              ? styles.active
              : ''
          }`}
          onClick={() =>
            onSelect([])
          }
        >
          <span>
            Все категории
          </span>

          <span
            className={
              styles.count
            }
          >
            {items.length}
          </span>
        </button>
      </div>

      <div className={styles.list}>
        {categories.map(category => {
          const isActive =
            activeCategoryIds.includes(
              category.id
            );

          return (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                isActive
                  ? styles.active
                  : ''
              }`}
              onClick={() =>
                toggleCategory(
                  category.id
                )
              }
            >
              <span>
                {category.name}
              </span>

              <span
                className={
                  styles.count
                }
              >
                {
                  items.filter(
                    item =>
                      item.categories.some(
                        c =>
                          c.id ===
                          category.id
                      )
                  ).length
                }
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesSidebar;