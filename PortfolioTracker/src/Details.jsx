import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

function Details() {
    const { listName } = useParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [Stauts, setStatus] = useState(null);

    useEffect(() => {
        if (listName) {
            axios.post('http://127.0.0.1:5000/getName', { listName })
                .then(response => {
                    console.log(response.data)
                    setData(response.data.results); // Handle response data
                })
                .catch(err => {
                    console.error('Error fetching data:', err);
                    setError('Failed to fetch data.');
                });
        }
    }, [listName]);

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
            <div key="list-component">
                <h1 id='list-content'>List Content</h1>
                {data.length > 0 ? (
                    <div className="List">
                        <ul id='List'>
                            {data.map((item, index) => (
                                <li id='ListItem' key={index}>
                                    <div>
                                        {item.symbol} - {item.name}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No items in your list</p>
                )}
            </div>
            <div className="logout-Button">
                <button id='logoutBtn' onClick={handleLogout}>Logout</button>
                {status && <p className={error ? 'error' : 'success'}>{status}</p>}
            </div>
        </>
    );
}

export default Details;
