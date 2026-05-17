import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { supabase } from '../../lib/supabase';

import styles from './CreateRecipeModal.module.css';

import type { CreateMenuItemDto } from '../../store/menuStore';
import { useCategoryStore } from '../../store/categoryStore';


interface FormValues {
  name: string;

  recipe: string;

  url: string;

  category_id: number;
}

interface Props {
  isOpen: boolean;

  onClose: () => void;

  onSubmit: (
    data: CreateMenuItemDto,
  ) => Promise<void> | void;
}

const CreateRecipeModal = ({
  isOpen,
  onClose,
  onSubmit,
}: Props) => {
  const { categories } = useCategoryStore();
  const [isUploading, setIsUploading] =
    useState(false);

  const [photoFile, setPhotoFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      recipe: '',
      url: '',
      category_id:
        categories[0]?.id ?? 1,
    },
  });

  if (!isOpen) {
    return null;
  }

  const submitHandler = async (
    data: FormValues
  ) => {
    try {
      setIsUploading(true);

      let photo_url = '';

      if (photoFile) {
        const fileExt =
          photoFile.name
            .split('.')
            .pop();

        const fileName = `${Date.now()}.${fileExt}`;

        const filePath = fileName;

        const { error } =
          await supabase.storage
            .from('menu')
            .upload(
              filePath,
              photoFile
            );

        if (error) {
          throw error;
        }

        const {
          data: publicUrlData,
        } = supabase.storage
          .from('menu')
          .getPublicUrl(filePath);

        photo_url =
          publicUrlData.publicUrl;
      }

      await onSubmit({
        ...data,

        photo_url,
      });

      reset();

      setPhotoFile(null);

      setPreviewUrl('');

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
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
            Новый рецепт
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
            <label>Название</label>

            <input
              {...register('name', {
                required:
                  'Введите название',
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

          <div className={styles.field}>
            <label>Категория</label>

            <select
              {...register(
                'category_id',
                {
                  required:
                    'Выберите категорию',

                  valueAsNumber: true,
                }
              )}
              className={styles.select}
            >
              {categories.map(
                category => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>

            {errors.category_id && (
              <span
                className={styles.error}
              >
                {
                  errors
                    .category_id
                    .message
                }
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label>Фото</label>

            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file =
                  e.target
                    .files?.[0];

                if (!file) {
                  return;
                }

                setPhotoFile(file);

                setPreviewUrl(
                  URL.createObjectURL(
                    file
                  )
                );
              }}
            />

            {previewUrl && (
              <img
                src={previewUrl}
                alt="preview"
                className={
                  styles.preview
                }
              />
            )}
          </div>

          <div className={styles.field}>
            <label>Ссылка</label>

            <input
              {...register('url')}
            />
          </div>

          <div className={styles.field}>
            <label>Рецепт</label>

            <textarea
              rows={8}
              {...register(
                'recipe',
                {
                  required:
                    'Введите рецепт',
                }
              )}
            />

            {errors.recipe && (
              <span
                className={styles.error}
              >
                {
                  errors.recipe
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
            disabled={isUploading}
          >
            {isUploading
              ? 'Загрузка...'
              : 'Создать рецепт'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipeModal;