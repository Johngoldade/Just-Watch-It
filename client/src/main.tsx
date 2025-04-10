import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.tsx'
import HomePage from './pages/Home.tsx'
import MovieDB from './pages/MovieDB.tsx'
import Groups from './pages/Groups.tsx'
import MyMovies from './pages/MyMovies.tsx'
import Login from './pages/Login.tsx'
import Signup from './pages/SignUp.tsx'
import ErrorPage from './pages/Error.tsx'
import Login from './pages/Login.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage /> 
      },
      {
        path: '/Movies',
        element: <MovieDB /> 
      },
      {
        path: '/Groups',
        element: <Groups />
      },
      {
        path: '/Mymovies',
        element: <MyMovies />
      }, 
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/Signup',
        element: <Signup />
      },
    ]
  }
])



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
