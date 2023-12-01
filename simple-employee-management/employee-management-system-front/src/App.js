import './App.css';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route index element={<ListEmployeeComponent />} />
            <Route path="/" element={<ListEmployeeComponent />}></Route>
            <Route path="/employees" element={<ListEmployeeComponent />}></Route>
            <Route path="/add-employee" element={<AddEmployeeComponent />}></Route>
            <Route path="/edit-employee/:id" element={<AddEmployeeComponent />}></Route>
            <Route path="/delete-employee/:id" element={<ListEmployeeComponent />}></Route>
            <Route path="*" element={<ListEmployeeComponent />}></Route>
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;