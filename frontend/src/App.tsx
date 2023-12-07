import React from 'react';
// <!-- Core theme CSS (includes Bootstrap)-->
import "./assets/css/styles.css"
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import AddPost from './pages/AddPost';
import Post from './pages/Post';
import PostUpdate from './pages/PostUpdate';
import "wowjs/css/libs/animate.css";
import LoginPage from './pages/login/LoinPage';
import Login from './pages/login/Login';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/' element={<PostList />} /> */}
        <Route path='/add-post' element={<AddPost />} />
        <Route path='/post-update/:pid' element={<PostUpdate />} />
        <Route path="/post/:pid" element={<Post />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
