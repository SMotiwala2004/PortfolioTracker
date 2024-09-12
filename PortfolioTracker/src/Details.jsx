import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import './details.css'; 

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
        <h1 id='list-content'>{listName} Content</h1>
        <div className="container">
                {data.length > 0 ? (
                    <div className="List">
                        <ul id='List'>
                            <span id='listHeader'>Items in your watchlist</span>
                            {data.map((item, index) => (
                                <li id='ListItem' key={index}>
                                    <div className="stockDetails">
                                        <span id='stockSymbol'>{item.symbol} -&nbsp;</span>
                                        <span id='stockName'>{item.name}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No items in your list</p>
                )}
                {data.length > 0 ? (
                    <div className="holdingList">
                        <ul id='List'>
                            <span id='listHeaderHolding'>Holdings in your list</span>
                            {data.some(item => item.holding === true) ? (
                                data.map((item, index) => (
                                    item.holding === true && (
                                        <li id="holdingItem" key={index}>
                                            <div className="holdingSymbol">
                                             <span id="holdingSymbol">{item.symbol}</span>
                                             <span id="price">{item.price}</span>
                                            </div>
                                        </li>
                                    )
                                ))
                            ) : (
                                <p>No Holdings in your list</p>
                            )}
                        </ul>
                    </div>
                ) : (
                    <p>No Holdings in your list</p>
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
