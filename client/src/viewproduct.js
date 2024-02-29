import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Viewproduct() {
  const [data, setData] = useState([]);

  const callviewData = async () => {
    try {
      const response = await fetch("/viewproduct", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("error fetching data");
      }
      const Data1 = await response.json();
      setData(Data1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callviewData();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`/delete/${productId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error deleting product");
      }
      // Remove the deleted product from the state
      setData((prevData) => prevData.filter((user) => user.id !== productId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <table border="1px">
        <thead>
          <tr>
            <th>S.no</th>
            <th>product_name</th>
            <th>product_price</th>
            <th>product_discription</th>
            <th>product_quanity</th>
            <th>product_image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((user) => (
              <tr key={user.id} className="border-bottom">
                <td>{user.id}</td>
                <td>{user.product_name}</td>
                <td>{user.product_price}</td>
                <td>{user.product_discription}</td>
                <td>{user.product_quanity}</td>
                <td>{user.product_image}</td>
                <td>
                  <img
                    src={"uploads/" + user.product_image}
                    alt="image"
                    style={{ width: 50 }}
                  />
                </td>
                <td>
                  <NavLink to={`/updateProduct/${user.id}`}>Edit</NavLink>
                  <button onClick={() => deleteProduct(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Viewproduct;
