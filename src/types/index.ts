import {z} from 'zod'
import { CategoryAPISchema, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema, SearchRecipeSchema } from '../utils/recipe-schema'

export type Categories = z.infer<typeof CategoryAPISchema>
export type SearchFilter= z.infer<typeof SearchRecipeSchema>
export type Drinks = z.infer<typeof DrinksAPIResponse>
export type Drink = z.infer<typeof DrinkAPIResponse>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>