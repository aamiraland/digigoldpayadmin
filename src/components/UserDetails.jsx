import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './UserDetails.css';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [showGoldTxns, setShowGoldTxns] = useState(false);
const [showBuySellTxns, setShowBuySellTxns] = useState(false);
const [showRedemptions, setShowRedemptions] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = doc(db, 'users', id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser({ id: userSnap.id, ...userSnap.data() });
        } else {
          console.error('User not found.');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <div>Loading user details...</div>;

  
  
  return (
    <div className="user-details-container">
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      <h2>User Details</h2>

      <div className="user-card">
        <p><strong>Name:</strong> {user.name || 'N/A'}</p>
        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
        <p><strong>Mobile Number:</strong> {user.mobilenumber || 'N/A'}</p>
        <p><strong>Gold Holdings:</strong> {user.gold || 0} grams</p>
        <p><strong>Balance:</strong> ₹ {parseFloat(user.balance || 0).toLocaleString()}</p>
        <p><strong>Total Invested:</strong> ₹ {parseFloat(user.totalInvested || 0).toLocaleString()}</p>
        <div className="transaction-container">
  {/* GOLD TRANSACTIONS */}
  <h3
    onClick={() => setShowGoldTxns(!showGoldTxns)}
    className="transaction-heading"
  >
    {showGoldTxns ? '▼' : '▶'} Transactions
  </h3>
  {showGoldTxns && (
   <div className="txn-container">
   {Array.isArray(user.goldTransactions) && user.goldTransactions.length > 0 ? (
     user.goldTransactions
       .slice() // Create a shallow copy of the array to avoid mutating the original state
       .reverse() // Reverse the array to display the latest transactions first
       .map((txn, index) => (
         <div key={index} className="txn-item" style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0', borderRadius: '8px' }}>
           <h4 style={{ marginBottom: '10px', fontSize: '18px' }}>Transaction {user.goldTransactions.length - index}</h4>
           <p><strong>Amount:</strong> ₹{txn.amountInRupees}</p>
           <p><strong>Gold:</strong> {txn.gold} grams</p>
           <p><strong>Price:</strong> ₹{txn.price}</p>
 
           {/* Convert the Firebase Timestamp to a Date object */}
           <p><strong>Time:</strong> {txn.timestamp ? new Date(txn.timestamp.seconds * 1000).toLocaleString() : 'N/A'}</p>
 
           {/* Displaying the 'to' email */}
           <p><strong>To:</strong> {txn.to}</p>
 
           <p><strong>Type:</strong> {txn.type}</p>
         </div>
       ))
   ) : (
     <p>No gold transactions available.</p>
   )}
 </div>
 
  
  
  )}

  {/* BUY/SELL TRANSACTIONS */}
  <h3
    onClick={() => setShowBuySellTxns(!showBuySellTxns)}
    className="transaction-heading"
  >
    {showBuySellTxns ? '▼' : '▶'} Gold Buy/Sell History
  </h3>
  {showBuySellTxns && (
    <div className="txn-container">
    {Array.isArray(user.goldbuyselltransactions) && user.goldbuyselltransactions.length > 0 ? (
      user.goldbuyselltransactions
        .slice() // Create a shallow copy of the array to avoid mutating the original state
        .reverse() // Reverse the array to display the latest transactions first
        .map((txn, index) => (
          <div key={index} className="txn-item" style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '18px' }}>Transaction {user.goldbuyselltransactions.length - index}</h4>
            <p><strong>Amount:</strong> ₹{txn.amount}</p>
            <p><strong>Gold:</strong> {txn.gold} grams</p>
            <p><strong>Price:</strong> ₹{txn.pricePerGram}</p>
    
            {/* Convert the Firebase Timestamp to a Date object */}
            <p><strong>Time:</strong> {txn.date ? new Date(txn.date).toLocaleString() : 'N/A'}</p>
    
            <p><strong>Type:</strong> {txn.type}</p>
          </div>
        ))
    ) : (
      <p>No Buy/Sell History available.</p>
    )}
  </div>
  
  )}

  {/* REDEMPTIONS */}
  <h3
    onClick={() => setShowRedemptions(!showRedemptions)}
    className="transaction-heading"
  >
    {showRedemptions ? '▼' : '▶'} Redeemed Gold
  </h3>
  {showRedemptions && (
    <div className="txn-container">
    {Array.isArray(user.goldRedemptions) && user.goldRedemptions.length > 0 ? (
      user.goldRedemptions
        .slice() // Create a shallow copy of the array to avoid mutating the original state
        .reverse() // Reverse the array to display the latest transactions first
        .map((txn, index) => (
          <div key={index} className="txn-item" style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '18px' }}>Transaction {user.goldRedemptions.length - index}</h4>
            
            {/* Convert the Firebase Timestamp to a Date object */}
            <p><strong>Time:</strong> {txn.date ? new Date(txn.date).toLocaleString() : 'N/A'}</p>
    
            <p><strong>Type:</strong> {txn.type || 'N/A'}</p>
            <p><strong>Amount:</strong> ₹{txn.weight || 'N/A'}</p>

          </div>
        ))
    ) : (
      <p>No Buy/Sell History available.</p>
    )}
  </div>
  )}
</div>


        
        <p><strong>Last Login:</strong> {user.lastLoginDate || 'N/A'}</p>
      </div>
    </div>
  );
  
};

export default UserDetails;
