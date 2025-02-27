import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard/Dashboard";
import ItemList from "./Components/Items/ItemList";
import ItemDetails from "./Components/Items/ItemDetails";
import MessageList from "./Components/Messaging/MessageList";
import MessageThread from "./Components/Messaging/MessageThread";
import SendMessage from "./Components/Messaging/SendMessage";
import Profile from "./Components/Profile";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import TransactionHistory from "./Components/Payments/TransactionHistory";
import PaymentForm from "./Components/Payments/PaymentForm";
import NotificationsList from "./Components/Notifications/NotificationsList";
import NotificationSystem from "./Components/Notifications/NotificationSystem";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <Navbar /> {/* Add Navigation */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/items" element={<ProtectedRoute><ItemList /></ProtectedRoute>} />
        <Route path="/items/:id" element={<ProtectedRoute><ItemDetails /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><MessageList /></ProtectedRoute>} />
        <Route path="/messages/:threadId" element={<ProtectedRoute><MessageThread /></ProtectedRoute>} />
        <Route path="/send-message" element={<ProtectedRoute><SendMessage /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><PaymentForm /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><NotificationsList /></ProtectedRoute>} />
        <Route path="/notification-system" element={<ProtectedRoute><NotificationSystem /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
