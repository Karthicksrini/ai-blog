import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Container, Card, CardContent, Typography, Divider, CircularProgress, Box } from "@mui/material";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        try {
            async function fetchBlog() {
                setLoading(true);
                const data = await axios.get(`${BACKEND_URL}/blog/${id}`);
                setBlog(data.data);
                setLoading(false);
            }
            fetchBlog();
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }, []);


    if (isLoading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <CircularProgress size={60} color="primary" />
            </Box>
        );

    if (!blog)
        return (
            <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
                <Typography variant="h5" color="error">
                    Blog not found!
                </Typography>
            </Container>
        );

    return <Container maxWidth="100px" sx={{ mt: 5 }}>
        <Card elevation={3} sx={{ p: 3, borderRadius: 3, transition: "0.3s", "&:hover": { transform: "scale(1.02)" } }}>
            <CardContent>
                <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: "primary.main", textAlign: "center" }}>
                    {blog.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" align="center" sx={{ mb: 2 }}>
                    By <strong>{blog.author}</strong> | {new Date(blog.created_at).toLocaleDateString()}
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Typography variant="body1" sx={{ lineHeight: 1.8, textAlign: "justify" }}>
                    {blog.content}
                </Typography>
            </CardContent>
        </Card>
    </Container>

}

export default Blog