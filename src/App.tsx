import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/index';
import { ReactPage } from '@/pages/react';
import { SupabasePage } from '@/pages/supabase';
import { PostTipPage } from '@/pages/post';
import { TipsPage } from '@/pages/tips';
import { LoginPage } from '@/pages/login';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { CategoryPage } from '@/pages/category/[href]';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/react"
          element={
            <ProtectedRoute>
              <ReactPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supabase"
          element={
            <ProtectedRoute>
              <SupabasePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post"
          element={
            <ProtectedRoute>
              <PostTipPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tips"
          element={
            <ProtectedRoute>
              <TipsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category/:href"
          element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
