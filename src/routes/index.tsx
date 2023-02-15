/* eslint-disable @typescript-eslint/promise-function-async */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';

const Beranda = lazy(() => import('@/containers/Beranda/Index'));
const Todo = lazy(() => import('@/containers/Todo/Index'));

const Root = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/auth" element={<Beranda />}></Route>
          <Route path="/" element={<Todo />}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default Root;
