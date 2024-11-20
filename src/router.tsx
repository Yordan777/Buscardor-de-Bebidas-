import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
const IndexPages = lazy(() => import('./pages/IndexPages'))
const FavoritesPages = lazy(() => import('./pages/FavoritesPages'))

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={
                        <Suspense>
                            <IndexPages />
                        </Suspense>} index />
                    <Route path='/favoritos' element={
                        <Suspense>
                            <FavoritesPages />
                        </Suspense>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
