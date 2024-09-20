import React , {useState , useEffect } from 'react';
import { getUsers } from '../services/api';


function UserPage() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers().then((response) => {
            setUsers(response.data);
        });
    }, []);
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}


export default UserPage; 
