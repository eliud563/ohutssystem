import React, { useEffect, useState } from "react";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(savedTransactions);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <strong>Amount:</strong> KES {transaction.amount} |  
              <strong> Phone:</strong> {transaction.phoneNumber} |  
              <strong> Status:</strong> {transaction.status} |  
              <strong> Date:</strong> {transaction.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionHistory;