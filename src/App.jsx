import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ProtectedRoute, PublicRoute } from './utils/protectedRoute';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { OrderPage } from './pages/OrderPage';
import { LoginPage } from './pages/LoginPage';

const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const AdminItemsPage = lazy(() => import('./pages/Admin/AdminItemsPage'));
const AdminItemForm = lazy(() => import('./pages/Admin/AdminItemForm'));

function App() {
  return (
    <Layout>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/order" element={<OrderPage />} />
          
          <Route path="/admin/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              
                <AdminDashboard />
              
            </ProtectedRoute>
          } />
          
          <Route path="/admin/items" element={
            <ProtectedRoute>
             
                <AdminItemsPage />
              
            </ProtectedRoute>
          } />
          
          <Route path="/admin/items/new" element={
            <ProtectedRoute>
              
                <AdminItemForm />
             
            </ProtectedRoute>
          } />
          
          <Route path="/admin/items/:id/edit" element={
            <ProtectedRoute>
             
                <AdminItemForm />
              
            </ProtectedRoute>
          } />
        </Routes>
     
    </Layout>
  );
}

export default App;