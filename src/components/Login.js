import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useInfo } from '../containers/hooks/useInfo';
import bcrypt from 'bcryptjs';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useInfo();
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Hash the password before sending it to the backend
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const response = login(username, hashedPassword);
            console.log(response);
        }
        catch (err) {
            console.log(err);
        }
        // 登入成功後進行路由導航
        navigate('/welcome');
    };

    return (
        <Box sx={{ maxWidth: 300, margin: '0 auto' }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="使用者名稱"
                    value={username}
                    onChange={handleUsernameChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    type="password"
                    label="密碼"
                    value={password}
                    onChange={handlePasswordChange}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    登入
                </Button>
            </form>
        </Box>
    );
};

export default Login;