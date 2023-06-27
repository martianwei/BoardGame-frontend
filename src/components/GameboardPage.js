import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useInfo } from '../containers/hooks/useInfo';
import { w3cwebsocket as WebSocket } from 'websocket';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const GameboardPage = () => {
    const { logged_in } = useInfo();
    const navigate = useNavigate();
    const { room_id } = useParams();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [client, setClient] = useState(null);
    useEffect(() => {
        if (!logged_in) {
            navigate('/login'); // 如果未登录，将用户重定向到登录页面
        }

        // 建立WebSocket连接
        const newClient = new WebSocket('ws://localhost:8000/ws?roomID=${room_id}');

        // 监听WebSocket消息
        newClient.onmessage = (message) => {
            const parsedMessage = JSON.parse(message.data);
            setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        };


        newClient.onclose = () => {
            console.log('WebSocket disconnected');
        };

        setClient(newClient);

        // 组件卸载时关闭WebSocket连接
        return () => {
            newClient.close();
        };
    }, [logged_in, navigate]);

    // 发送WebSocket消息
    const sendMessage = () => {
        if (inputValue.trim() !== '') {
            client.send(
                JSON.stringify({
                    roomID: room_id,
                    text: inputValue,
                })
            );
            setInputValue('');
        }
    };
    return (
        <Box sx={{ maxWidth: 500, margin: '100px auto' }}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Gameboard rows={6} columns={5} />
                    <div>
                        <h1>WebSocket Client</h1>
                        <ul>
                            {messages.map((message, index) => (
                                <li key={index}>{message.text}</li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};

const Gameboard = ({ rows, columns }) => {
    return (
        <Grid container spacing={0}>
            {Array.from({ length: rows }, (_, row) => (
                <Grid container item key={row} xs={12}>
                    {Array.from({ length: columns }, (_, col) => (
                        <Intersection
                            key={col}
                            hasOutline={col !== columns - 1 && row !== rows - 1}
                            isCircle={
                                (col === 1 && row === 1) ||
                                (col === 1 && row === 3) ||
                                (col === 3 && row === 1) ||
                                (col === 3 && row === 3)
                            }
                        />
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};

const Intersection = ({ hasOutline, isCircle }) => {
    return (
        <Box
            sx={{
                width: '50px',
                height: '50px',
                position: 'relative',
                outline: hasOutline ? '1px solid' : 'none',
            }}
        >

            {isCircle ? <Circle /> : <Rectangle />}
        </Box>
    );
};


const Rectangle = () => {
    return (
        <Box
            sx={{
                width: '40px',
                height: '20px',
                position: 'absolute',
                outline: '1px solid',
                backgroundColor: 'white',
                top: '0',
                left: '0',
                transform: 'translate(-50%, -50%)',
            }}
        ></Box>
    );
};
const Circle = () => {
    return (
        <Box
            sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                outline: '1px solid',
                backgroundColor: 'white',
                position: 'absolute',
                top: '0',
                left: '0',
                transform: 'translate(-50%, -50%)',
            }}
        ></Box>
    )
}



export default GameboardPage;
