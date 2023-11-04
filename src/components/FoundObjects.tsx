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
    Box,
    Paper,
    Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { addMessage } from "../redux/slices/chatSlices";
import CustomNavbar from "./CustomNavbar";
import { v4 as uuidv4 } from "uuid";
import { selectUserLogin } from "../redux/slices/UserLogin";

import { useParams } from "react-router-dom";
import dayjs from "dayjs";

function FoundObjects() {
    const selectedUser = useSelector(selectUserLogin);
    const messages = useSelector((state: RootState) => state.chat.messages);
    const dispatch = useDispatch();

    const [inputMessage, setInputMessage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const { id } = useParams();

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
    };

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value);
    }

    const newDayjsObject = dayjs();
    const dateAsString: string = newDayjsObject.format(); 

    const handleCommentSubmit = () => {
        if (selectedUser && id) {
            if (inputMessage.trim() !== "") {
                const newMessage = {
                    id: uuidv4(),
                    user: selectedUser!,
                    message: inputMessage,
                    timestamp: dateAsString,
                    image: imageUrl && (imageUrl.startsWith("http") ? imageUrl : undefined),
                    likes: 0,
                    likedBy: [],
                    lostObjectId: id,
                };

                dispatch(addMessage(newMessage));
                setInputMessage("");
                setImageUrl("")
            } else {

            }
        } else {
            console.log("No hay mensaje o objeto perdido seleccionado");
        }
    };

    const filteredMessages = messages.filter((msg) => msg.lostObjectId === id);
    const isButtonDisabled = !selectedUser || inputMessage.trim() === "";

    return (
        <>
            <CustomNavbar />
            <Grid textAlign="center">
                <Typography variant="h4" component="h2">
                    chat Messenger...!!!
                </Typography>
            </Grid>
            <Card sx={{ width: "100%", mx: "auto" }}>
                <Typography variant="h5" gutterBottom margin={2}>
                    Bienvenid@ {selectedUser?.name.first}
                </Typography>

                <Box display="flex" flexDirection="column" alignItems="center">
                    {filteredMessages.length > 0 ? (
                        filteredMessages.map((msg, index) => (
                            <Card
                                key={index}
                                elevation={3}
                                sx={{ width: "100%", maxWidth: 800, mb: 2 }}
                            >
                                <CardContent>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Avatar
                                            src={msg.user.picture.thumbnail}
                                            alt="Avatar"
                                            sx={{ mr: 2 }}
                                        />
                                        <Typography variant="h6">
                                            {msg.user.login.username}:
                                        </Typography>
                                    </Box>
                                    <Typography>{msg.message}</Typography>
                                    {msg.image && (
                                        <img
                                            src={msg.image}
                                            alt="Mensaje con imagen"
                                            style={{ maxWidth: "100%" }}
                                        />
                                    )}
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                        sx={{ mt: 1 }}
                                    >
                                        Enviado: {new Date(msg.timestamp).toLocaleTimeString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="body1" color="textSecondary" mt={2}>
                            No hay mensajes disponibles.
                        </Typography>
                    )}
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
        </>
    );
}

export default FoundObjects;
