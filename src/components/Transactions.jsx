import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Adjust path to your firebase config
import { collection, getDocs } from 'firebase/firestore';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "transactions"));
        const txnList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Sort by timestamp (if available), newest first
        txnList.sort((a, b) => {
          const timeA = a.timestamp?.seconds || 0;
          const timeB = b.timestamp?.seconds || 0;
          return timeB - timeA;
        });

        setTransactions(txnList);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="txn-container" style={{ padding: '20px',alignContent:'center',justifyContent:"center", maxWidth: '80%', maxHeight:'80vh', marginTop:'3vh', marginBottom:'3vh',marginLeft:'auto', marginRight:'auto' }}>
      <h2 style={{ textAlign: 'center', marginTop:'-5px', marginBottom: '20px' }}>All Transactions</h2>

      {transactions.length > 0 ? (
        transactions.map((txn, index) => (
          <div
            key={txn.id}
            className="txn-item"
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '15px',
              marginBottom: '15px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h4 style={{ marginBottom: '10px' }}>Transaction #{transactions.length - index}</h4>
            <p><strong>Amount:</strong> ₹{txn.amountInRupees || 'N/A'}</p>
            <p><strong>Gold:</strong> {txn.gold || 'N/A'} grams</p>
            <p><strong>Price:</strong> ₹{txn.price  ||'N/A'}</p>
            <p><strong>Sender:</strong> ₹{txn.sender}</p>
            <p><strong>Receiver:</strong> ₹{txn.receiver}</p>

            <p>
              <strong>Date and Time:</strong>{" "}
              {txn.timestamp?.seconds
                ? new Date(txn.timestamp.seconds * 1000).toLocaleString()
                : 'N/A'}
            </p>
           
          </div>
        ))
      ) : (
        <p style={{ textAlign: 'center' }}>No transactions found.</p>
      )}
    </div>
  );
};

export default Transactions;
