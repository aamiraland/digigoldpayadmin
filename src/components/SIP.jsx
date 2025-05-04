import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Adjust import path based on your project
import { collection, getDocs } from 'firebase/firestore';

const SIP = () => {
  const [SIPData, setSIPData] = useState([]);

  useEffect(() => {
    const fetchSIPData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'SIP'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSIPData(data.reverse()); // Most recent first
      } catch (error) {
        console.error('Error fetching SIP data:', error);
      }
    };

    fetchSIPData();
  }, []);

  return (
    <div
      className="SIP-container"
      style={{
        padding: '20px',
        maxWidth: '80%',
        maxHeight: '80vh',
        overflowY: 'auto',
        marginTop: '20px',
        marginBottom: '30px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: '20px',
        border: '1px solid #ddd',

        
      }}
    >
      <h2 style={{ 
        marginTop: '0px',
        marginBottom: '20px' }}>Total SIP</h2>

      {SIPData.length > 0 ? (
        SIPData.map((SIP, index) => (
          <div
            key={SIP.id || index}
            className="SIP-item"
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '15px',
              width: '95%',
              backgroundColor: 'white',
            }}
          >
            <h4 style={{ marginBottom: '10px' }}>SIP No.{SIPData.length - index}</h4>
            <p><strong>Email:</strong> {SIP.userEmail }</p>

            <p><strong>Amount:</strong> ₹{SIP.amount}</p>
            <p><strong>Started:</strong> {SIP.createdAt ? new Date(SIP.createdAt.seconds * 1000).toLocaleString()
                : SIP.date
                ? new Date(SIP.date).toLocaleString()
                : 'N/A'} </p>
            <p><strong>frequency:</strong> ₹{SIP.frequency}</p>
            <p><strong>Status:</strong> {SIP.status }</p>
            
          </div>
        ))
      ) : (
        <p>No SIP records found.</p>
      )}
    </div>
  );
};

export default SIP;
