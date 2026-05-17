import { useForm } from 'react-hook-form';

import styles from './CreateCategoryModal.module.css';

interface FormValues {
  name: string;
}

interface Props {
  isOpen: boolean;

  onClose: () => void;

  onSubmit: (
    data: FormValues
  ) => Promise<void> | void;
}

const CreateCategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
  });

  if (!isOpen) {
    return null;
  }

  const submitHandler = async (
    data: FormValues
  ) => {
    await onSubmit(data);

    reset();

    onClose();
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={e =>
          e.stopPropagation()
        }
      >
        <div className={styles.header}>
          <h2 className={styles.title}>
            Новая категория
          </h2>

          <button
            type="button"
            className={
              styles.closeButton
            }
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit(
            submitHandler
          )}
        >
          <div className={styles.field}>
            <label>
              Название категории
            </label>

            <input
              {...register('name', {
                required:
                  'Введите название категории',
              })}
            />

            {errors.name && (
              <span
                className={styles.error}
              >
                {
                  errors.name
                    .message
                }
              </span>
            )}
          </div>

          <button
            type="submit"
            className={
              styles.submitButton
            }
          >
            Создать категорию
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;