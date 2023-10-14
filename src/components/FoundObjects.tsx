import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import {
    Typography,
    Card,
    CardContent,
    Avatar,
    TextField,
    Button,
    IconButton,
    Box,
    Paper,
    Grid,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { addLike, addMessage, removeLike } from "../redux/slices/chatSlices";
import { ThumbUp, ThumbUpOutlined } from "@mui/icons-material";
import CustomNavbar from "./CustomNavbar";

function FoundObjects() {
    const selectedUser = useSelector(
        (state: RootState) => state.userLogin.loggedInUser
    );
    const messages = useSelector((state: RootState) => state.chat.messages);
    const dispatch = useDispatch();

    const [inputMessage, setInputMessage] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
    };

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (inputMessage.trim() !== "") {
            const newMessage = {
                user: selectedUser!,
                message: inputMessage,
                timestamp: Date.now(),
                image: imageUrl && (imageUrl.startsWith("http") ? imageUrl : undefined),
                likes: 0,
                likedBy: [],
            };
            dispatch(addMessage(newMessage));
            console.log("Mensaje enviado:", inputMessage);
            setInputMessage("");
            setImageUrl("");
        }
    };

    const handleLike = (index: number) => {
        if (selectedUser) {
            const message = messages[index];

            if (message.likedBy.includes(selectedUser.login.username)) {
                dispatch(removeLike({ index, username: selectedUser.login.username }));
            } else {
                dispatch(addLike({ index, username: selectedUser.login.username }));
            }
        }
    };

    const isButtonDisabled = !selectedUser;

    return (
        <div>
            <CustomNavbar />
            <Grid textAlign="center">
                <Typography variant="h4" component="h2">  chat Messenger...!!! </Typography>

            </Grid>
            <Card sx={{ width: "100%", mx: "auto" }}>
                <Typography variant="h5" gutterBottom margin={2}>
                    Bienvenid@ {selectedUser?.name.first}
                </Typography>

                <Box display="flex" flexDirection="column" alignItems="center">
                    {messages.map((msg, index) => (
                        <Card key={index} elevation={3} sx={{ width: "100%", maxWidth: 800, mb: 2 }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Avatar src={msg.user.picture.thumbnail} alt="Avatar" sx={{ mr: 2 }} />
                                    <Typography variant="h6">{msg.user.login.username}:</Typography>
                                </Box>
                                <Typography>{msg.message}</Typography>
                                {msg.image && (
                                    <img src={msg.image} alt="Mensaje con imagen" style={{ maxWidth: "100%" }} />
                                )}
                                <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                                    Enviado: {new Date(msg.timestamp).toLocaleTimeString()}
                                </Typography>
                                <Box display="flex" alignItems="center" mt={1}>
                                    <IconButton color="info" onClick={() => handleLike(index)}>
                                        {selectedUser &&
                                            msg.likedBy.includes(selectedUser.login.username) ? (
                                            <ThumbUp color="primary" />
                                        ) : (
                                            <ThumbUpOutlined />
                                        )}
                                    </IconButton>
                                    <Typography variant="caption" color="textSecondary" ml={1}>
                                        {msg.likes} {msg.likes === 1 ? "like" : "likes"}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
                <Paper sx={{ p: 1, mt: 1, mb: 5 }}>
                    <Typography variant="h5">Te ponemos en contacto</Typography>
                    <TextField
                        placeholder="Escribe tu mensaje aquí..."
                        fullWidth
                        minRows={3}
                        variant="outlined"
                        value={inputMessage}
                        onChange={handleMessageChange}
                        sx={{ mt: 1 }}
                    />
                    <TextField
                        placeholder="Ingresa la URL de una imagen (opcional)"
                        fullWidth
                        variant="outlined"
                        value={imageUrl}
                        onChange={handleImageUrlChange}
                        sx={{ mt: 1 }}
                    />
                </Paper>
                <Box sx={{ display: "flex", justifyContent: "center", pb: 5 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SendIcon />}
                        onClick={handleCommentSubmit}
                        disabled={isButtonDisabled}
                    >
                        Enviar Mensaje
                    </Button>
                </Box>
            </Card>

        </div>
    );
}

export default FoundObjects