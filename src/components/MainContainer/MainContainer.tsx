import { useEffect, useState } from 'react';
import { useMenuStore } from '../../store/menuStore';
import styles from './MainContainer.module.css';
import RecipeList from '../RecipeList/RecipeList';
import SearchBar from '../SearchBar/SearchBar';
import { useCategoryStore } from '../../store/categoryStore';

const MainContainer = () => {
  const { fetchItems, items } = useMenuStore()
  const { activeCategoryIds, showFavorites } = useCategoryStore();
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchItems();
  }, [])

  const filteredItems = items.filter(
  item => {
    const matchesSearch =
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesCategory =
      !activeCategoryIds.length
        ? true
        : item.categories.some(
            category =>
              activeCategoryIds.includes(
                category.id
              )
          );

    const matchesFavorites =
      showFavorites
        ? item.favorites
        : true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesFavorites
    );
  }
);

  return (
    <section className={styles.mainContainer}>
      <div className={styles.placeholder}>
        <SearchBar
          value={search}
          onChange={setSearch}
        />
        <RecipeList items={filteredItems} />
      </div>
    </section>
  );
};

export default MainContainer;