import { create } from 'zustand';

import { supabase } from '../lib/supabase';

export interface Category {
    id: number;

    name: string;
}

interface CategoryStore {
    showFavorites: boolean;
    categories: Category[];

    activeCategoryId: number | null;
    isLoading: boolean;

    fetchCategories: () => Promise<void>;
    setActiveCategoryId: (id: number | null) => void;
    setShowFavorites: () => void;
    addCategory: (
        name: string
    ) => Promise<Category>;
}

export const useCategoryStore =
    create<CategoryStore>(set => ({
        categories: [],

        activeCategoryId: null,

        isLoading: false,

        showFavorites: false,

        fetchCategories: async () => {
            try {
                set({
                    isLoading: true,
                });

                const { data, error } =
                    await supabase
                        .from('category')
                        .select(`
            id,
            name
          `).order('created_at').overrideTypes<Category[]>();

                if (error) {
                    throw error;
                }

                set({
                    categories: data,
                });
            } catch (error) {
                console.error(error);
            } finally {
                set({
                    isLoading: false,
                });
            }
        },

        setActiveCategoryId: (id) => {
            set({ activeCategoryId: id })
        },

        setShowFavorites: () => {
            set((state) => ({ ...state, showFavorites: !state.showFavorites}))
        },

        addCategory: async (
            name: string
        ) => {
            try {
                const { data, error } =
                    await supabase
                        .from('category')
                        .insert({
                            name,
                        })
                        .select()
                        .single();

                if (error) {
                    throw error;
                }

                set(state => ({
                    categories: [
                        ...state.categories,
                        data,
                    ],
                }));

                return data;
            } catch (error) {
                console.error(error);

                throw error;
            }
        },
    }));
