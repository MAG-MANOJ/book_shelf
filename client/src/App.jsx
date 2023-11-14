import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CreatedBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import DeleteBook from './pages/DeleteBooks';
import EditBook from './pages/EditBooks';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/books/create' element={<CreatedBook/>} />
      <Route path='/books/details/:id' element={<ShowBook/>} />
      <Route path='/books/edit/:id' element={<EditBook/>} />
      <Route path='/books/delete/:id' element={<DeleteBook/>} />
    </Routes>
  )
}

export default App