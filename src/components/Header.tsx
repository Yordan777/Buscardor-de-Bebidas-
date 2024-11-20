import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

    const { pathname } = useLocation()
    const [searchFilter, setSearchFilter] = useState({
        ingredient: '',
        category: ''
    })

    const isHome = useMemo(() => pathname === '/', [pathname])

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const searchRecipe = useAppStore((state) => state.searchRecipe)
    const categories = useAppStore((state) => state.categories)
    const showNotification = useAppStore((state) => state.showNotification)


    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setSearchFilter({
            ...searchFilter,
            [e.target.name]: e.target.value
        })

    }

    const handleSummit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Validar
        if (Object.values(searchFilter).includes('')) {
            showNotification({
                text: 'Todos Los Campos Son Obligatorios',
                error: true
            })
            return
        }


        // consultar las reseta
        searchRecipe(searchFilter)
        
    }
    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <header className={isHome ? ' bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>

                    <nav className='flex gap-4'>
                        <NavLink to='/'
                            className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}
                        >Inicio</NavLink>
                        <NavLink to='/favoritos'
                            className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}
                        >Favorito</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form
                        className='md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6'
                        onSubmit={handleSummit}
                    >
                        <div className='space-y-4'>
                            <label
                                htmlFor="ingredient"
                                className='block text-white uppercase font-extrabold text-lg'
                            >Nombre o Ingredientes</label>

                            <input
                                id='ingredient'
                                type='text'
                                name='ingredient'
                                className='p-3 w-full rounded-lg focus:outline-none'
                                placeholder='Nombre o Ingrediente. Ej. Vodka, Tequila, Café'
                                onChange={handleChange}
                                value={searchFilter.ingredient}
                            />
                        </div>
                        <div className='space-y-4'>
                            <label
                                htmlFor="category"
                                className='block text-white uppercase font-extrabold text-lg'
                            >Categoría</label>

                            <select
                                id='category'
                                name='category'
                                className='p-3 w-full rounded-lg focus:outline-none'
                                onChange={handleChange}
                                value={searchFilter.category}
                            >
                                <option value="">-- Seleccione --</option>
                                {categories.drinks.map((category) => (
                                    <option
                                        key={category.strCategory}
                                        value={category.strCategory}
                                    >{category.strCategory}</option>
                                ))}

                            </select>
                        </div>
                        <input
                            type='submit'
                            value='Buscar Recetas'
                            className='cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase'
                        />
                    </form>
                )}
            </div>
        </header>
    )
}
