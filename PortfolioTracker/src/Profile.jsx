import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import './profile.css'

function Profile() {
    const [Watchlists, setWatchlists] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWatchlists = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/watchlists');
                console.log(response.data)
                // Assuming the data structure has a 'results' key
                if (response.data && response.data.results) {
                  setWatchlists(response.data.results || []);
                  console.log('Watchlists state:', response.data.results);
                } else {
                    setError('Unexpected response format.');
                }
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
          setError(response.data.status !== 'Logged Out.');
          navigate('/');
        })
        .catch(error => {
          console.error('There was an issue logging out.', error);
          setStatus('Not logged in.')
          setError(true)
        })
    } 

    return (
      <>
        <div key="profile-component">  {/* Add this key to force re-render */}
          <h1>Your Watchlist</h1>
          {Watchlists.results && Watchlists.results.length > 0 ? (
            <ul>
              {Watchlists.results.map((item, index) => (
                <li key={index}>
                  <div>{item.display_name}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in your watchlist.</p>
          )}
        </div>
        <div>
          <button
          onClick={handleLogout}
          >Logout
          </button>
        {status && <p className={hasError ? 'error' : 'success'}>{status}</p>}
        </div>
      </>
  );
}

export default Profile;