import { useParams } from "react-router-dom";

function TransactionHistory() {
  const { userId } = useParams(); // Get userId from URL

  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <p>Showing transactions for User ID: {userId}</p>
      {/* Fetch and display transactions for this user */}
    </div>
  );
}

export default TransactionHistory;
