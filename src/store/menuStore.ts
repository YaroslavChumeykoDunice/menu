import { create } from 'zustand';

import { supabase } from '../lib/supabase';
import type { Category } from './categoryStore';

export interface MenuItem {
  id: number;
  created_at: Date;
  name: string;
  url: string;
  recipe: string;
  favorites: boolean;
  photo_url: string;
  categories: Category[];
}

export interface CreateMenuItemDto {
  name: string;
  url: string;
  recipe: string;
  favorites?: boolean;
  photo_url: string;

  category_ids: number[];
}

interface MenuStore {
  items: MenuItem[];

  isLoading: boolean;

  error: string | null;

  fetchItems: () => Promise<void>;

  addItem: (dto: CreateMenuItemDto) => Promise<void>;

  removeItem: (id: number) => Promise<void>;

  toggleFavorite: (id: number, value: boolean) => Promise<void>;
}

export const useMenuStore = create<MenuStore>((set, get) => ({
  items: [],

  isLoading: false,

  error: null,

  fetchItems: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const { data, error } = await supabase
        .from('menu')
        .select(`
          id,
          created_at,
          name,
          url,
          recipe,
          favorites,
          photo_url,

          categories:menu_categories(
      category:category(
        id,
        name
      )
    )
        `);

      if (error) {
        throw error;
      }

      const normalizedItems: MenuItem[] =
        (data ?? []).map(item => ({
          ...item,

          categories:
            item.categories.map(
              (relation: any) =>
                relation.category
            ),
        }));

      const sortedItems = normalizedItems.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );

      set({
        items: (sortedItems) ?? [],
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Fetch menu error',
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  addItem: async dto => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      // 1. создаём блюдо
      const { data: menuItem, error: menuError } =
        await supabase
          .from('menu')
          .insert({
            name: dto.name,
            url: dto.url,
            recipe: dto.recipe,
            favorites: dto.favorites ?? false,
            photo_url: dto.photo_url,
          })
          .select()
          .single();

      if (menuError || !menuItem) {
        throw menuError;
      }

      // 2. создаём связи категорий
      if (dto.category_ids?.length) {
        const relations = dto.category_ids.map(
          categoryId => ({
            menu_id: menuItem.id,
            category_id: categoryId,
          })
        );

        const { error: relationError } =
          await supabase
            .from('menu_categories')
            .insert(relations);

        if (relationError) {
          throw relationError;
        }
      }

      // 3. получаем готовый объект с категориями
      const { data, error } = await supabase
        .from('menu')
        .select(`
        id,
        name,
        created_at,
        url,
        recipe,
        favorites,
        photo_url,

        categories:menu_categories(
      category:category(
        id,
        name
      )
    )
      `)
        .eq('id', menuItem.id)
        .single();

      if (error) {
        throw error;
      }

      // 4. нормализуем
      const normalizedItem: MenuItem = {
        ...data,

        categories: data.categories.map(
          (item: any) => item.category
        ),
      };

      // 5. обновляем store
      set({
        items: [
          normalizedItem,
          ...get().items,
        ],
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Add menu item error',
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  removeItem: async id => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const { error } = await supabase
        .from('menu')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      set({
        items: get().items.filter(item => item.id !== id),
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Remove menu item error',
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  toggleFavorite: async (id, value) => {
    try {
      set({ isLoading: true, error: null });

      const { error } = await supabase
        .from('menu')
        .update({ favorites: value })
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        items: state.items.map((item) =>
          item.id === id
            ? { ...item, favorites: value }
            : item
        ),
      }));


    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Change Favorite item error',
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));
