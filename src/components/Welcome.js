import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfo } from '../containers/hooks/useInfo';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const WelcomePage = () => {
    const { logged_in } = useInfo();
    const navigate = useNavigate();

    const handleSnackbarClose = () => {
        console.log('close');
        navigate('/login'); // 如果未登入，將用戶重定向到根路由"/"
    };

    if (!logged_in) {
        return (
            <Snackbar open={true} autoHideDuration={5000} onClose={handleSnackbarClose}>
                <MuiAlert severity="error" onClose={handleSnackbarClose}>
                    請先登入
                </MuiAlert>
            </Snackbar>
        );
    }
    return (
        <div>
            <h1>歡迎來到四國軍棋大戰</h1>
        </div>
    );
};

export default WelcomePage;