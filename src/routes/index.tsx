import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Beranda, Todo } from '@/containers/Index';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Beranda />}></Route>
        <Route path="/" element={<Todo />}></Route>
      </Routes>
    </Router>
  );
};

export default Root;
