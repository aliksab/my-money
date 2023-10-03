import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Windmill } from '@windmill/react-ui';
import ThemedSuspense from './components/ThemedSuspense';
import { SidebarProvider } from './components/context/SidebarContext';
import { Provider } from 'react-redux';
import { createStore } from "./store/createStore";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <SidebarProvider>
        <Suspense fallback={<ThemedSuspense />}>
          <Windmill usePreferences>
            <App />
          </Windmill>
        </Suspense>
      </SidebarProvider>
    </BrowserRouter>
  </Provider>
    
);