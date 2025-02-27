import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../Auth/AuthContext";  
import { useTransactionContext } from "../Payments/TransactionContext";  // Import transaction context

function PaymentForm({ item }) {
  const [amount, setAmount] = useState(item?.price || 0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const { addTransaction } = useTransactionContext(); // Get function to update transactions

  const isValidPhoneNumber = (number) => {
    return /^(07|01)\d{8}$/.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidPhoneNumber(phoneNumber)) {
      alert("Please enter a valid phone number starting with 07 or 01 and exactly 10 digits.");
      return;
    }

    if (amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      userId: user?.id,
      amount,
      phoneNumber,
      status: "success",
      date: new Date().toLocaleString(),
    };

    addTransaction(newTransaction); // ✅ Add to global transaction state

    alert(`Payment of KES ${amount} simulated successfully for ${phoneNumber}.`);

    if (user?.id) {
      navigate(`/transaction-history/${user.id}`);
    }
  };

  return (
    <div style={{ backgroundColor: "#ADD8E6", padding: "20px", borderRadius: "10px", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h3>Pay via M-Pesa (Mock)</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.3cm" }}>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ padding: "10px", width: "100%", border: "1px solid #ccc", borderRadius: "5px" }} />

        <input type="tel" placeholder="Enter Phone Number" value={phoneNumber} onChange={(e) => { const input = e.target.value.replace(/\D/g, ""); if (input.length <= 10) setPhoneNumber(input); }} maxLength="10" style={{ padding: "10px", width: "100%", border: "1px solid #ccc", borderRadius: "5px" }} />

        <button type="submit" style={{ padding: "12px", backgroundColor: "white", color: "black", border: "1px solid black", cursor: "pointer", fontWeight: "bold", borderRadius: "5px" }}>
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;