// components/TransactionHistory.js
import React, { useState } from 'react';
import './TransactionHistory.css';
import { Filter, Download, ArrowUpRight, ArrowDownLeft, Search } from 'lucide-react';

const TransactionHistory = () => {
  // Mock data for transactions
  const mockTransactions = [
    { 
      id: 1, 
      type: 'credit', 
      amount: 1500.00, 
      from: 'ABC Company', 
      date: '2025-04-10', 
      time: '09:15 AM', 
      category: 'Salary', 
      status: 'Completed'
    },
    { 
      id: 2, 
      type: 'debit', 
      amount: 45.99, 
      to: 'Netflix', 
      date: '2025-04-08', 
      time: '10:30 AM', 
      category: 'Entertainment', 
      status: 'Completed'
    },
    { 
      id: 3, 
      type: 'debit', 
      amount: 125.00, 
      to: 'Grocery Store', 
      date: '2025-04-05', 
      time: '03:45 PM', 
      category: 'Food', 
      status: 'Completed'
    },
    { 
      id: 4, 
      type: 'credit', 
      amount: 250.00, 
      from: 'John Doe', 
      date: '2025-04-01', 
      time: '02:20 PM', 
      category: 'Transfer', 
      status: 'Completed'
    },
    { 
      id: 5, 
      type: 'debit', 
      amount: 89.99, 
      to: 'Electric Company', 
      date: '2025-03-28', 
      time: '11:10 AM', 
      category: 'Utilities', 
      status: 'Completed'
    },
    { 
      id: 6, 
      type: 'debit', 
      amount: 35.00, 
      to: 'Gas Station', 
      date: '2025-03-25', 
      time: '05:30 PM', 
      category: 'Transport', 
      status: 'Completed'
    },
    { 
      id: 7, 
      type: 'credit', 
      amount: 150.00, 
      from: 'Jane Smith', 
      date: '2025-03-20', 
      time: '01:15 PM', 
      category: 'Transfer', 
      status: 'Completed'
    },
    { 
      id: 8, 
      type: 'debit', 
      amount: 199.99, 
      to: 'Online Store', 
      date: '2025-03-18', 
      time: '07:45 PM', 
      category: 'Shopping', 
      status: 'Completed'
    },
  ];
  
  // State for filters
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all', // 'all', 'credit', 'debit'
    dateFrom: '',
    dateTo: '',
    category: '',
  });
  
  // Filter transactions based on search query and filters
  const filteredTransactions = transactions.filter(transaction => {
    // Search query
    const searchString = searchQuery.toLowerCase();
    const searchMatch = 
      (transaction.from && transaction.from.toLowerCase().includes(searchString)) ||
      (transaction.to && transaction.to.toLowerCase().includes(searchString)) ||
      transaction.category.toLowerCase().includes(searchString) ||
      transaction.amount.toString().includes(searchString);
    
    if (!searchMatch) return false;
    
    // Transaction type filter
    if (filters.type !== 'all' && transaction.type !== filters.type) return false;
    
    // Date range filter
    if (filters.dateFrom && new Date(transaction.date) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(transaction.date) > new Date(filters.dateTo)) return false;
    
    // Category filter
    if (filters.category && transaction.category !== filters.category) return false;
    
    return true;
  });
  
  // Get unique categories for filter dropdown
  const categories = [...new Set(transactions.map(t => t.category))];
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Apply filters
  const applyFilters = () => {
    setFilterOpen(false);
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      type: 'all',
      dateFrom: '',
      dateTo: '',
      category: '',
    });
    setFilterOpen(false);
  };
  
  // Export transactions
  const exportTransactions = () => {
    alert('Exporting transactions as CSV...');
    // Implementation would generate and download a CSV file
  };

  return (
    <div className="transaction-history">
      <h1>Transaction History</h1>
      
      <div className="transaction-tools">
        <div className="search-box">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="transaction-actions">
          <button 
            className="filter-button" 
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={20} />
            <span>Filter</span>
          </button>
          
          <button className="export-button" onClick={exportTransactions}>
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {filterOpen && (
        <div className="filter-panel">
          <div className="filter-group">
            <label>Transaction Type</label>
            <select 
              name="type" 
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="all">All Transactions</option>
              <option value="credit">Income / Credits</option>
              <option value="debit">Expenses / Debits</option>
            </select>
          </div>
          
          <div className="filter-row">
            <div className="filter-group">
              <label>From Date</label>
              <input 
                type="date" 
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label>To Date</label>
              <input 
                type="date" 
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          
          <div className="filter-group">
            <label>Category</label>
            <select 
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-actions">
            <button className="reset-button" onClick={resetFilters}>Reset</button>
            <button className="apply-button" onClick={applyFilters}>Apply Filters</button>
          </div>
        </div>
      )}
      
      <div className="transactions-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Transaction</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>
                    <div className="transaction-date">
                      <span className="date">{transaction.date}</span>
                      <span className="time">{transaction.time}</span>
                    </div>
                  </td>
                  <td>
                    <div className="transaction-party">
                      <div className="transaction-icon">
                        {transaction.type === 'credit' ? 
                          <ArrowDownLeft size={20} className="credit-icon" /> : 
                          <ArrowUpRight size={20} className="debit-icon" />
                        }
                      </div>
                      <div className="party-info">
                        <span className="party-name">
                          {transaction.type === 'credit' ? 
                            `From: ${transaction.from}` : 
                            `To: ${transaction.to}`
                          }
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="transaction-category">{transaction.category}</span>
                  </td>
                  <td>
                    <span className={`transaction-amount ${transaction.type}`}>
                      {transaction.type === 'credit' ? '+' : '-'}
                      ${transaction.amount.toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <span className={`transaction-status status-${transaction.status.toLowerCase()}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-transactions">
                  No transactions found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;