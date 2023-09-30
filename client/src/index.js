import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Router } from 'react-router-dom';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
