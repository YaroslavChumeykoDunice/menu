import { useState } from 'react';
import styles from './RecipeCard.module.css';
import { generateCategoryColor } from '../../utils/generateCategoryColor';
import { useMenuStore } from '../../store/menuStore';
import UrlIcon from '../../icons/url.svg?react';

interface Category {
  id: number;
  name: string;
}

export interface RecipeItem {
  id: number;
  name: string;
  url: string;
  recipe: string;
  favorites: boolean;
  photo_url: string;
  category: Category | null;
}

interface Props {
  item: RecipeItem;
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
            {item.category && (
                <span
                  className={styles.category}
                  style={{
                    backgroundColor: generateCategoryColor(
                      item.category.name
                    ),
                  }}
                >
                  {item.category.name}
                </span>
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