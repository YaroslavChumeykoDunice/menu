import styles from './Header.module.css';
import LogoIcon from '../../icons/logo.svg?react'
import FavoritesIcon from '../../icons/like.svg?react'
import { useCategoryStore } from '../../store/categoryStore';

interface Props {
  onOpenSidebar: () => void;
}

const Header = ({ onOpenSidebar }: Props) => {
  const { showFavorites, setShowFavorites } = useCategoryStore();
  return (
    <header className={styles.header}>
      <div className={styles.logoBlock}>
        <button
          className={styles.burgerButton}
          onClick={onOpenSidebar}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={styles.logo}><LogoIcon /></div>
        <h1 className={styles.title}>MenuCraft</h1>
      </div>
      <div className={styles.favoretis} onClick={setShowFavorites}> <FavoritesIcon style={{
        color: showFavorites ? 'red' : 'white'
      }}/> Избраное</div>
    </header>
  );
};

export default Header;