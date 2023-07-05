import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import GlobalStyle from './GlobalStyle';
import store from './store';
import Header from './components/common/Header';
import Main from './pages/Main';
import CommunityPage from './pages/community/CommunityPage';
import SelectSchedulePage from './pages/community/SelectSchedulePage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <Provider store={store}>
        <Header ismainpage="true" />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/select" element={<SelectSchedulePage />} />
        </Routes>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
