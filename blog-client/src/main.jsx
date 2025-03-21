import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Blog from './pages/Blog.jsx';
import CreateBlog from './pages/CreateBlog.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/create-blog' element={<CreateBlog />} />
      </Routes>
    </Router>
  </StrictMode>,
)
