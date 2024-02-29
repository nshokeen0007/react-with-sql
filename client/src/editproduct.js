import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';

function EditProduct() {
  const navigate=useNavigate()
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({
    product_name: '',
    product_price: '',
    product_discription: '',
    product_quanity: '',
  });

  const fetchProductData = async () => {
    try {
      const response = await fetch(`/updateProduct/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching product data');
      }

      const productData = await response.json();
      setProduct(productData);
      setFormData({
        product_name: productData.product_name,
        product_price: productData.product_price,
        product_discription: productData.product_discription,
        product_quanity: productData.product_quanity,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/updateProduct/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error updating product data');
      }
      alert('data send')
   navigate('/viewproduct')
      // Handle success (e.g., show a success message or navigate back)
    } catch (err) {
      console.error(err);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label><br/>
        <input
          type="text"
          name="product_name"
          value={formData.product_name}
          onChange={handleInputChange}
        /><br/>
        <label>Product Price:</label><br/>
        <input
          type="text"
          name="product_price"
          value={formData.product_price}
          onChange={handleInputChange}
        /><br/>
        <label>Product Description:</label><br/>
        <textarea
          name="product_discription"
          value={formData.product_discription}
          onChange={handleInputChange}
        /><br/>
        <label>Product Quantity:</label><br/>
        <input
          type="text"
          name="product_quanity"
          value={formData.product_quanity}
          onChange={handleInputChange}
        /><br/>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProduct;
