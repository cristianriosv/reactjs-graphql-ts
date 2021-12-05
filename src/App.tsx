import React from 'react';
import Layout from './components/layout/Layout';
import './App.css';
import AppRoutes from './pages/AppRoutes';

function App() {
  return (
    <Layout>
      <AppRoutes/>
    </Layout>
  );
}

export default App;
