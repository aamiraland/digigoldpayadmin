import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [SIPCount, setSIPCount] = useState(0);
  const [totalGold, setTotalGold] = useState(0);

  const [finalCounts, setFinalCounts] = useState({
    users: 0,
    transactions: 0,
    sips: 0,
    gold: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const users = usersSnapshot.docs.map(doc => doc.data());

      const goldSum = users.reduce((sum, user) => sum + (parseFloat(user.gold) || 0), 0);

      const transactionsSnapshot = await getDocs(collection(db, "transactions"));
      const SIPSnapshot = await getDocs(collection(db, "SIP"));

      setFinalCounts({
        users: usersSnapshot.size,
        transactions: transactionsSnapshot.size,
        sips: SIPSnapshot.size,
        gold: parseFloat(goldSum.toFixed(4)),
      });
    };

    fetchData();
  }, []);

  // Animate counts
  useEffect(() => {
    const animateCount = (setFn, finalValue, isFloat = false) => {
      let count = 0;
      const steps = 50;
      const increment = isFloat ? finalValue / steps : Math.max(1, Math.floor(finalValue / steps));

      const interval = setInterval(() => {
        count += increment;
        if (count >= finalValue) {
          count = finalValue;
          clearInterval(interval);
        }
        setFn(isFloat ? parseFloat(count.toFixed(4)) : Math.floor(count));
      }, 20);
    };

    animateCount(setUserCount, finalCounts.users);
    animateCount(setTransactionCount, finalCounts.transactions);
    animateCount(setSIPCount, finalCounts.sips);
    animateCount(setTotalGold, finalCounts.gold, true);

  }, [finalCounts]);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card clickable" style={{ background: "lightgreen" }} onClick={() => navigate("/userlist")}>
          <h3>Total Users</h3>
          <p>{userCount}</p>
        </div>
        <div className="stat-card clickable" style={{ background: "yellow" }} onClick={() => navigate("/usergold")}>
          <h3>Total Gold Held</h3>
          <p>{totalGold} g</p>
        </div>
        <div className="stat-card clickable" style={{ background: "lightblue" }} onClick={() => navigate("/transactions")}>
          <h3>Total Gold Transactions</h3>
          <p>{transactionCount}</p>
        </div>
       
        <div className="stat-card clickable" style={{ background: "pink" }} onClick={() => navigate("/sip")}>
          <h3>Total SIPs</h3>
          <p>{SIPCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
