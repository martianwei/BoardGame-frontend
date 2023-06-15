import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            // const response = await axios.post('/api/signup', { name, password });
            // console.log(response.data); // 可自行處理註冊成功的回應

            // 清空表單
            setName('');
            setPassword('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Typography variant="h4" component="h1" mb={4}>
                註冊
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    width: 300,
                }}
            >
                <TextField
                    label="使用者名稱"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="密碼"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" onClick={handleSignup}>
                    註冊
                </Button>
            </Box>
        </Box>
    );
};

export default SignupPage;
