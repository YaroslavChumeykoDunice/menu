import clsx from 'clsx';

import styles from './Sidebar.module.css';
import CategoriesSidebar from '../CategoriesSidebar/CategoriesSidebar';
import { useCategoryStore } from '../../store/categoryStore';
import { useEffect, useState } from 'react';
import CreateCategoryModal from '../CreateCategoryModal/CreateCategoryModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: Props) => {

  const {
    categories,
    fetchCategories,
    setActiveCategoryId,
    activeCategoryId,
    addCategory,
  } = useCategoryStore();

  const [
    isCreateCategoryOpen,
    setIsCreateCategoryOpen,
  ] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div
        className={clsx(styles.overlay, {
          [styles.overlayVisible]: isOpen,
        })}
        onClick={onClose}
      />

      <aside
        className={clsx(styles.sidebar, {
          [styles.sidebarOpen]: isOpen,
        })}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
        >
          ×
        </button>

        <CategoriesSidebar
          categories={categories}
          activeCategoryId={
            activeCategoryId
          }
          onSelect={setActiveCategoryId}
          onCreateCategory={() =>
            setIsCreateCategoryOpen(true)
          }
        />

        <CreateCategoryModal
          isOpen={isCreateCategoryOpen}
          onClose={() =>
            setIsCreateCategoryOpen(false)
          }
          onSubmit={async data => {
            await addCategory(data.name);
          }}
        />
      </aside>
    </>
  );
};

export default Sidebar;