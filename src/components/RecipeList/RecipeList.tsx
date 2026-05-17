
import type { CreateMenuItemDto, MenuItem } from '../../store/menuStore';
import CreateRecipeCard from '../CreateRecipeCard/CreateRecipeCard';
import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipeList.module.css';

interface Props {
  items: MenuItem[];
}

const RecipeList = ({ items }: Props) => {
  return (
    <section className={styles.list}>
      <CreateRecipeCard />
      {items.map(item => (
        <RecipeCard
          key={item.id}
          item={item}
        />
      ))}
    </section>
  )
};

export default RecipeList;