import { create } from 'zustand';

import { supabase } from '../lib/supabase';

export interface Category {
    id: number;

    name: string;
}

interface CategoryStore {
    showFavorites: boolean;
    categories: Category[];

    activeCategoryIds: number[];
    isLoading: boolean;

    fetchCategories: () => Promise<void>;
    setActiveCategoryIds: (id: number[]) => void;
    setShowFavorites: () => void;
    addCategory: (
        name: string
    ) => Promise<Category>;
}

export const useCategoryStore =
    create<CategoryStore>(set => ({
        categories: [],

        activeCategoryIds: [],

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

        setActiveCategoryIds: (id) => {
            set({ activeCategoryIds: id })
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
