import { useState } from 'react';
import styles from './RecipeCard.module.css';
import { generateCategoryColor } from '../../utils/generateCategoryColor';
import { useMenuStore, type MenuItem } from '../../store/menuStore';
import UrlIcon from '../../icons/url.svg?react';


interface Props {
  item: MenuItem;
}

const RecipeCard = ({ item }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const { toggleFavorite, removeItem } = useMenuStore();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item.id, !item.favorites);
  };

  const handleDeleteItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeItem(item.id);
  }

  return (
    <article
      className={styles.card}
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      <div
        className={`${styles.inner} ${isFlipped ? styles.flipped : ''
          }`}
      >
        {/* FRONT */}
        <div className={styles.front}>
          <div className={styles.imageWrapper}>
            <img
              src={item.photo_url}
              alt={item.name}
              className={styles.image}
            />

            {/* ❤️ BUTTON */}
            <button
              className={`${styles.favoriteBtn} ${item.favorites ? styles.active : ''
                }`}
              onClick={handleFavoriteClick}
            >
              ♥
            </button>

            <button
              className={styles.deleteBtn}
              onClick={handleDeleteItem}
            >
              🗑
            </button>
          </div>

          <div className={styles.content}>
            {!!item.categories?.length && (
              <div className={styles.categories}>
                {item.categories.map(category => (
                  <span
                    key={category.id}
                    className={styles.category}
                    style={{
                      backgroundColor: generateCategoryColor(
                        category.name
                      ),
                    }}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            <h3 className={styles.title}>{item.name}</h3>

            <a className={styles.footer} href={item.url} target='_blank' onClick={(e) => e.stopPropagation()}>
              <span className={styles.source}>
                Источник: {item.url}
              </span>

              <div className={styles.linkButton}>
                <UrlIcon />
              </div>
            </a>
          </div>
        </div>

        {/* BACK */}
        <div className={styles.back}>
          <div className={styles.recipeContent}>
            <h3 className={styles.recipeTitle}>
              {item.name}
            </h3>

            <div className={styles.recipeText}>
              {item.recipe}
            </div>

            <div className={styles.footer}>
              <span className={styles.source}>
                Источник: {item.url}
              </span>

              <button className={styles.linkButton}>
                ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;