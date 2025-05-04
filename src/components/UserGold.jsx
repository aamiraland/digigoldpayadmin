import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';


const UserGold = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalGold, setTotalGold] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);

      // Calculate total gold here after fetching users
      const goldSum = usersData.reduce((sum, user) => sum + (parseFloat(user.gold) || 0), 0);
      setTotalGold(goldSum.toFixed(4));
    };

    fetchUsers();
  }, []);

 

  const filteredUsers = users.filter(user => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      (user.name && user.name.toLowerCase().includes(lowerSearch)) ||
      (user.email && user.email.toLowerCase().includes(lowerSearch)) 
    );
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Total Gold: {totalGold} g</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.search}
      />

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul style={styles.list}>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              style={styles.card}
             
            >
              <div style={styles.summary}>
                {user.name} ({user.email}) <strong><div style={{fontSize:'1.5rem'}}>{user.gold || 0} g</div></strong>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// styles (same as before)...
// Keep your existing styles object here



const styles = {
  container: {
    padding: '1rem',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Segoe UI, Roboto, sans-serif',
    animation: 'fadeIn 1s ease-out',
    
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2.5rem',
    color: '#333',
    animation: 'fadeIn 1.5s ease-out',
  },
  search: {
    padding: '0.75rem 1rem',
    width: '100%',
    maxWidth: '600px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    margin: '0 auto 2rem',
    display: 'block',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
    transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
  },
  searchFocus: {
    boxShadow: '0 0 15px rgba(0, 123, 255, 0.5)',
    transform: 'scale(1.02)',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  card: {
    padding: '1rem 1.5rem',
    marginBottom: '1.5rem',
    background: 'linear-gradient(to right,rgb(237, 237, 237),rgb(222, 222, 222))',
    borderRadius: '12px',
    borderColor:'black',
    borderStyle:'2px',
    boxShadow: '1px 4px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
  },
  summary: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#222',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'color 0.3s ease',
  },
  dropdown: {
    marginTop: '2rem',
    background: '#fff',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    fontSize: '0.95rem',
    lineHeight: 1.5,
    color: '#444',
    opacity:1,
    transform: 'translateY(-20px)',
    animation: 'dropdownAppear 1s ease forwards',
  },
  link: {
    display: 'inline-block',
    marginTop: '0.75rem',
    color: '#007BFF',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.2s',
  },
  linkHover: {
    color: '#0056b3',
  },

  // Keyframe animations
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-30px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '@keyframes dropdownAppear': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
};

export default UserGold;

