import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import GlobalStyle from './GlobalStyle';
import store from './store';
import Header from './components/common/Header';
import Loading from './components/ui/loading/Loading';
import Footer from './components/common/Footer';

const Main = lazy(() => import('./pages/Main'));
const CommunityPage = lazy(() => import('./pages/community/CommunityPage'));
const SelectSchedulePage = lazy(
  () => import('./pages/community/SelectSchedulePage')
);
const PostCommunitypage = lazy(
  () => import('./pages/community/PostCommunitypage')
);
const ErrorPage = lazy(() => import('./pages/error/ErrorPage'));
const ScheduleRegister = lazy(
  () => import('./pages/schedule/ScheduleRegister')
);
const RegisterDetail = lazy(() => import('./pages/schedule/ScheduleDetail'));
const DetailPage = lazy(() => import('./pages/community/DetailPage'));
const MyPage = lazy(() => import('./pages/mypage/MyPage'));
const UserSetting = lazy(() => import('./pages/userSetting/UserSetting'));
const MoNav = lazy(() => import('./components/common/MoNav'));

const queryClient = new QueryClient();

// Todo 추후 리팩토링 필요함 (component로 정리하기)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Suspense fallback={<Loading />}>
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/register" element={<ScheduleRegister />} />
              <Route
                path="/register/detail/:courseId"
                element={<RegisterDetail />}
              />
              <Route path="/community" element={<CommunityPage />} />
              <Route
                path="/community/select"
                element={<SelectSchedulePage />}
              />
              <Route path="/community/post" element={<PostCommunitypage />} />
              <Route path="/community/:postId" element={<DetailPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/setting" element={<UserSetting />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route
                path="*"
                element={<ErrorPage />}
                errorElement={<ErrorPage />}
              />
            </Routes>
            <Footer />
          </Suspense>
          <MoNav />
          <App />
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
