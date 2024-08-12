import './App.css';
import { CustomerHandler, IssueHandler, OrderHandler, ProductHandler } from './handlers';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
      <Router>
          <Routes>
              <Route path="/order" element={<OrderHandler />} />
              <Route path= "/customer/:id" element= {<CustomerHandler/>} />
              <Route path= "/products/:orderId" element= {<ProductHandler/>} />
              <Route path= "/issues/:productId" element= {<IssueHandler/>} />
          </Routes>
      </Router>
    );
}

export default App;
