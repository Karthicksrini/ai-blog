import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import '../App.css';

const CreateBlog = () => {
    const [topic, setTopic] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleGenerateBlog = async () => {
        try {
            setIsLoading(true);
            if (!topic.trim()) {
                alert("Please enter a blog topic");
                return;
            }
            await axios.post(`${BACKEND_URL}/blog/`, { topic });
            navigate("/");
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleGenerateBlog();
        }
    };

    return (
        <>
            <Container maxWidth="sm" style={{ marginTop: "40px" }}>
                <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
                    <Typography variant='h4' gutterBottom> Generate a Blog </Typography>

                    <TextField
                        fullWidth
                        autoFocus
                        label="Enter a blog topic"
                        variant='outlined'
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        style={{ marginBottom: "20px" }}
                        onKeyDown={handleKeyDown}
                    />

                    <Button
                        variant='outlined'
                        color='primary'
                        disabled={isLoading}
                        onClick={handleGenerateBlog}
                        style={{ width: "100%", padding: "10px" }}
                    >
                        {isLoading ? "Generating...." : "Generate a Blog"}
                    </Button>
                </Paper>
            </Container>
        </>
    )
}

export default CreateBlog