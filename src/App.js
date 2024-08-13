import './App.css';
import { CustomerHandler, IssueHandler, OrderHandler, ProductHandler, EmployeeHandler} from './handlers';
import React from 'react';
import MainPage from './MainPage';
import './css/MainPage.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
      <Router>
          <Routes>
              <Route path="/" element={<MainPage/>} />
              <Route path="/branch/:branchName" element={<OrderHandler />} />
              <Route path="/employee/:branchId" element={<EmployeeHandler/>} />
              <Route path= "/customer/:id" element= {<CustomerHandler/>} />
              <Route path= "/products/:orderId" element= {<ProductHandler/>} />
              <Route path= "/issues/:productId" element= {<IssueHandler/>} />
              <Route path="/employees/:branchId" element={<EmployeeHandler />} />
          </Routes>
      </Router>
    );
}

export default App;
