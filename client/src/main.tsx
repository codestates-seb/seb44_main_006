import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import GlobalStyle from './GlobalStyle';
import store from './store';
import Header from './components/common/Header';
import Main from './pages/Main';
import CommunityPage from './pages/community/CommunityPage';
import SelectSchedulePage from './pages/community/SelectSchedulePage';
import PostCommunitypage from './pages/community/PostCommunitypage';
import ErrorPage from './pages/error/ErrorPage';
import ScheduleRegister from './pages/schedule/ScheduleRegister';
import DetailPage from './pages/community/DetailPage';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/register" element={<ScheduleRegister />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/select" element={<SelectSchedulePage />} />
            <Route path="/community/post" element={<PostCommunitypage />} />
            <Route path="/community/:postId" element={<DetailPage />} />
            <Route path="/error/:status" element={<ErrorPage />} />
          </Routes>
          <App />
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
