

import React, { useEffect, useState } from 'react';

function ViewData() {
  const [user, setUser] = useState([]);

  const callViewData = async () => {
    try {
      const res = await fetch('/viewdata', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error('Error fetching data');
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    callViewData();
  }, []);

  return (
    <>
      <table border="1px">
        <thead>
          <tr>
            <th>S.no</th>
            <th>id</th>
            <th>email</th>
            <th>password</th>
            <th>file</th>
          </tr>
        </thead>
        <tbody>
          {user.length > 0 &&
            user.map((user,index) => (
              <tr key={user.id} className="border-bottom">
                <td>{index+1}</td>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.image}</td>
                <td><img src={"uploads/http://localhost:9881/"+user.image} alt="s" style={{width:50}}/></td>


              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default ViewData;
