import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Addproduct(){
const navigate=useNavigate();
const [data,setdata]=useState({
    product_name:'',product_price:'',product_discription:'',product_quanity:'',product_image:''
})

const handleSubmit=(e)=>{
e.preventDefault();
const formData = new FormData();
formData.append('product_name',data.product_name);
formData.append('product_price',data.product_price);
formData.append('product_discription',data.product_discription)
formData.append('product_quanity',data.product_quanity);
formData.append('product_image',data.product_image)

axios.post('/addproduct',formData)
       .then(res=>{
        console.log(res)
        window.alert('data send successfull')
        navigate('/')
       })
       .catch(err =>{
        console.log(err)
       })
}
const handleChange =(e) =>{
    setdata({...data,[e.target.name]:e.target.value})
}
const handlePhoto =(e) =>{
    setdata({...data,product_image:e.target.files[0]});
}

    return(
        <>
          <div className='container'>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name</label><br/>
        <input
          type='text'
          name='product_name'
          value={data.product_name}
          onChange={handleChange}
          required
        /><br/>

        <label>Product Price</label><br/>
        <input
          type='number'
          name='product_price'
          value={data.product_price}
          onChange={handleChange}
          required
        /><br/>

        <label>Product Description</label><br/>
        <textarea
          name='product_discription'
          value={data.product_discription}
          onChange={handleChange}
          required
        /><br/>

        <label>Product Quantity</label><br/>
        <input
          type='number'
          name='product_quanity'
          value={data.product_quanity}
          onChange={handleChange}
          required
        /><br/>

        <label>Product Image</label><br/>
        <input
          type='file'
          accept='image/*'
          name='product_image'
          onChange={handlePhoto}
          required
        /><br/><br/>

        <button type='submit'>Add Product</button>
      </form>
    </div>


        </>
    )
}
export default Addproduct