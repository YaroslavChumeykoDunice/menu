import { create } from 'zustand';

import { supabase } from '../lib/supabase';
import { mockMenuItems } from '../mocks';
import type { Category } from './categoryStore';

export interface MenuItem {
  id: number;
  created_at: Date;
  name: string;
  url: string;
  recipe: string;
  favorites: boolean;
  photo_url: string;
  category: Category | null;
}

export interface CreateMenuItemDto {
  name: string;
  url: string;
  recipe: string;
  favorites?: boolean;
  photo_url: string;

  category_id: number;
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
          category (
            id,
            name
          )
        `).overrideTypes<MenuItem[]>();

      if (error) {
        throw error;
      }

      const sortedItems = data.sort(
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

      const { data, error } = await supabase
        .from('menu')
        .insert({
          name: dto.name,
          url: dto.url,
          recipe: dto.recipe,
          favorites: dto.favorites ?? false,
          photo_url: dto.photo_url,

          category_id: dto.category_id,
        })
        .select(`
          id,
          name,
          url,
          recipe,
          favorites,
          photo_url,
          category (
            id,
            name
          )
        `)
        .single().overrideTypes<MenuItem>();

      if (error) {
        throw error;
      }

      set({
        items: [data, ...get().items],
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
