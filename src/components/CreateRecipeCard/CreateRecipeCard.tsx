import { useState } from 'react';
import { useMenuStore } from '../../store/menuStore';
import CreateRecipeModal from '../CreateRecipeModal/CreateRecipeModal';
import styles from './CreateRecipeCard.module.css';


const CreateRecipeCard = () => {
	const { addItem } = useMenuStore();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				className={styles.card}
				onClick={() => setIsOpen(true)}
			>
				<div className={styles.iconWrapper}>
					<span className={styles.plus}>+</span>
				</div>

				<h3 className={styles.title}>
					Добавить рецепт
				</h3>

				<p className={styles.description}>
					Создайте новую карточку блюда
				</p>
			</button>
			<CreateRecipeModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={addItem} />
		</>

	);
};

export default CreateRecipeCard;