import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './App.tsx'
import MovieDetail  from './MovieDetail.tsx'
import Header from './Header.tsx';

// urlに合わせてコンポーネントを指定
const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/movies/:movieId", Component: MovieDetail },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header>
      {/* RouterProviderでrooterに合わせてコンポーネントを表示 */}
      <RouterProvider router={router} />
    </Header>
  </StrictMode>,
)
