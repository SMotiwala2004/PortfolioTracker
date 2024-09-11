import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';

function Profile() {
    const [Watchlists, setWatchlists] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchWatchlists = async () => {
          try {
              const response = await axios.get('http://127.0.0.1:5000/watchlists');
              // Access the nested results array
              setWatchlists(response.data.results.results || []);
              console.log(response.data)
          } catch (err) {
              console.error('Error fetching watchlists:', err);
              setError('Failed to fetch watchlists.');
          }
      };
  
      fetchWatchlists();
  }, []);
  

    const handleLogout = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/logout')
            .then(response => {
                setStatus(response.data.status);
                setError(response.data.status !== 'Logged out successfully');
                navigate('/');
            })
            .catch(error => {
                console.error('There was an issue logging out.', error);
                setStatus('Not logged in.');
                setError(true);
            });
    };

    return (
        <>
            <div key="profile-component">
                <h1>Your Watchlist</h1>
                {Watchlists.length > 0 ? (
                    <div className="watchList">
                        <ul id='watchList'>
                            {Watchlists.map((item, index) => (
                                <li id='watchListItem' key={index}>
                                    <div>
                                        <Link className="watchListLink" to={`/Details/${item.display_name}`}>
                                            {item.icon_emoji} {item.display_name}
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No items in your watchlist.</p>
                )}
            </div>
            <div className="logout-Button">
                <button id='logoutBtn' onClick={handleLogout}>Logout</button>
                {status && <p className={error ? 'error' : 'success'}>{status}</p>}
            </div>
        </>
    );
}

export default Profile;
