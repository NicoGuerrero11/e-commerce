import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import Cart from './pages/Cart.jsx'
import MainLayout from './layouts/MainLayout'
import AdminProductList from './pages/admin/products/AdminProductList.jsx'

function App() {
    return (
        <Routes>
            {/* Main Layout */}
            <Route path="/" element={<MainLayout />}>
                {/* Nested Routes */}
                <Route index element={<Products />} />
                <Route path="/products" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/products" element={<AdminProductList />} />
            </Route>
        </Routes>
    );
}

export default App;