import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // 在這裡處理登入邏輯

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