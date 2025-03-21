import { useEffect, useState } from 'react';
import '../App.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Container, Grid2, Typography, TextField, Button, CardContent, Box } from "@mui/material";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(`${BACKEND_URL}/blog/`);
                setBlogs(data.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);

    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const titleText = "AI-Powered Blog";

    useEffect(() => {
        if (index < titleText.length) {
            setTimeout(() => {
                setDisplayText(titleText.slice(0, index + 1));
                setIndex(index + 1);
            }, 100); // Typing speed
        }
    }, [index]);

    const filteredBlog = blogs?.length ? blogs?.filter((blog) => blog.title.toLowerCase().includes(search)) : [];

    const handleDelete = async (id) => {
        try {
            const data = await axios.delete(`${BACKEND_URL}/blog/${id}`);
            setBlogs(data.data);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid2 item container xs={12} spacing={5} display={'flex'} justifyContent={"space-between"}>
                <Grid2 item xs={12} md={6}>
                    <Typography variant='h3' align='center' fontWeight="bold"
                        gutterBottom
                        component={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        sx={{
                            textShadow: "4px 4px 10px rgba(0,0,0,0.3)", // Smooth shadow effect
                            background: "linear-gradient(90deg, #007FFF, #00C2FF)", // Gradient color
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent", // Makes gradient text visible
                            // fontFamily: "'Courier New', monospace", // Typewriter font
                        }}>
                        {displayText}
                    </Typography>
                </Grid2>
                <Grid2 item xs={12} md={6}>
                    <Button
                        LinkComponent={Link}
                        to={`/create-blog   `}
                        variant='contained'
                        color='secondary'
                        sx={{ mt: 2, mb: 4 }}
                    >
                        Generate a Blog
                    </Button>
                </Grid2>
            </Grid2>

            <TextField
                fullWidth
                variant='outlined'
                label="Search blog"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 4 }}
            />

            <Grid2 container spacing={4} xs={12} display={"flex"} justifyContent={"space-between"}>
                {
                    !filteredBlog.length ? (
                        <Typography variant='h6' color='textSecondary' align='center' sx={{ width: '100%' }}>
                            No Blogs Found
                        </Typography>
                    ) :
                        filteredBlog.map((blog) => {
                            return (
                                <Grid2 item xs={12} key={blog.id} maxWidth={"400px"}
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 2, y: 0 }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                >
                                    <Card sx={{ height: "100%", transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                                        <CardContent>
                                            <Typography variant='h5' fontWeight="bold">
                                                {blog.title}
                                            </Typography>
                                            <Typography variant='body2' color='textSecondary' mt={1}>
                                                {blog.summary}
                                            </Typography>
                                            <Grid2 container display={"flex"} justifyContent={"space-around"}>
                                                <Grid2 item xs={12} md={6}>
                                                    <Button
                                                        LinkComponent={Link}
                                                        to={`/blog/${blog.id}`}
                                                        variant='contained'
                                                        color='primary'
                                                        sx={{ mt: 2 }}
                                                    >
                                                        Read More
                                                    </Button>
                                                </Grid2>
                                                <Grid2 item>
                                                    <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
                                                        <IconButton
                                                            onClick={() => handleDelete(blog.id)}
                                                            sx={{
                                                                color: "red",
                                                                backgroundColor: "rgba(255, 0, 0, 0.1)",
                                                                transition: "0.3s",
                                                                "&:hover": {
                                                                    backgroundColor: "rgba(255, 0, 0, 0.3)",
                                                                    transform: "scale(1.1)"
                                                                }
                                                            }}
                                                        >
                                                            <DeleteIcon fontSize="medium" />
                                                        </IconButton>
                                                    </Box>
                                                </Grid2>
                                            </Grid2>
                                        </CardContent>
                                    </Card>
                                </Grid2>
                            )
                        })
                }
            </Grid2>
        </Container>
    )
}

export default Home
