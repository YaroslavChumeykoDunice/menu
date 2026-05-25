import { useState } from 'react';

import {
  Controller,
  useForm,
} from 'react-hook-form';

import { supabase } from '../../lib/supabase';

import styles from './CreateRecipeModal.module.css';

import type { CreateMenuItemDto } from '../../store/menuStore';

import { useCategoryStore } from '../../store/categoryStore';
import { generateCategoryColor } from '../../utils/generateCategoryColor';

interface FormValues {
  name: string;

  recipe: string;

  url: string;

  category_ids: number[];
}

interface Props {
  isOpen: boolean;

  onClose: () => void;

  onSubmit: (
    data: CreateMenuItemDto
  ) => Promise<void> | void;
}

const CreateRecipeModal = ({
  isOpen,
  onClose,
  onSubmit,
}: Props) => {
  const { categories } =
    useCategoryStore();

  const [isUploading, setIsUploading] =
    useState(false);

  const [photoFile, setPhotoFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState('');

  const [isOpenSelect, setIsOpenSelect] =
    useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      recipe: '',
      url: '',
      category_ids: [],
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
          {/* NAME */}

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

          {/* CATEGORIES */}

          <div className={styles.field}>
            <label>Категории</label>

            <Controller
              control={control}
              name="category_ids"
              rules={{
                required: 'Выберите категории',
              }}
              render={({ field }) => {
                const selectedCategories =
                  categories.filter(category =>
                    field.value.includes(
                      category.id
                    )
                  );

                return (
                  <div
                    className={
                      styles.multiSelect
                    }
                  >
                    {/* CONTROL */}

                    <div
                      className={
                        styles.selectControl
                      }
                      onClick={() =>
                        setIsOpenSelect(
                          prev => !prev
                        )
                      }
                    >
                      {!!selectedCategories.length ? (
                        <div
                          className={
                            styles.chips
                          }
                        >
                          {selectedCategories.map(
                            category => (
                              <div
                                key={category.id}
                                className={
                                  styles.chip
                                }
                                style={{
                                  backgroundColor:
                                    generateCategoryColor(
                                      category.name
                                    ),
                                }}
                              >
                                {
                                  category.name
                                }

                                <button
                                  type="button"
                                  className={
                                    styles.removeChip
                                  }
                                  onClick={e => {
                                    e.stopPropagation();

                                    field.onChange(
                                      field.value.filter(
                                        id =>
                                          id !==
                                          category.id
                                      )
                                    );
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <span
                          className={
                            styles.placeholder
                          }
                        >
                          Выберите категории
                        </span>
                      )}

                      <div
                        className={`${styles.arrow} ${isOpenSelect
                            ? styles.arrowOpen
                            : ''
                          }`}
                      >
                        ▼
                      </div>
                    </div>

                    {/* DROPDOWN */}

                    {isOpenSelect && (
                      <div
                        className={
                          styles.dropdown
                        }
                      >
                        {categories
                          .filter(
                            category =>
                              !field.value.includes(
                                category.id
                              )
                          )
                          .map(category => (
                            <button
                              key={category.id}
                              type="button"
                              className={
                                styles.option
                              }
                              onClick={() => {
                                field.onChange([
                                  ...field.value,
                                  category.id,
                                ]);
                              }}
                            >
                              {category.name}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                );
              }}
            />

            {errors.category_ids && (
              <span className={styles.error}>
                {errors.category_ids.message}
              </span>
            )}
          </div>

          {/* PHOTO */}

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

          {/* URL */}

          <div className={styles.field}>
            <label>Ссылка</label>

            <input
              {...register('url')}
            />
          </div>

          {/* RECIPE */}

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