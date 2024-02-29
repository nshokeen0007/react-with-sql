import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [user, setData] = useState({
        email: '',
        username: '',
        password: ''
    });

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...user, [name]: value });
    };

    const PostData = async (e) => {
        e.preventDefault();
        const { email, username, password } = user;
        const image = e.target.elements.image.files[0];

        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('image', image);

        try {
            const res = await fetch('/signup', {
                method: 'post',
                body: formData
            });

            const data = await res.json();
            if (data.status === 422 || !data) {
                window.alert('Data not sent');
            } else {
                window.alert('Data sent');
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
            window.alert('Error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={PostData} encType="multipart/form-data">
                <label>Email</label><br />
                <input type='email' placeholder='Enter your email here' name='email' value={user.email} onChange={handleInputs} /><br />
                <label>Username</label><br />
                <input type='text' placeholder='Enter your Username here' name='username' value={user.username} onChange={handleInputs} /><br />
                <label>Password</label><br />
                <input type='password' placeholder='Enter your Password here' name='password' value={user.password} onChange={handleInputs} /><br />
                <input type="file" name="image" /><br />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
