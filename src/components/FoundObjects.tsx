import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Badge,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MaiIcon from "@mui/icons-material/Mail";
import CustomNavbar from "./CustomNavbar";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  addMessage,
  markMessageAsRead,
  selectMenssage,
} from "../redux/slices/ChatSlices";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectLostObjects,
  updateLostObjectStatus,
} from "../redux/slices/LostObjectSlice";
import { UserData } from "../model/interface";

const FoundObjects = () => {
  const messages = useAppSelector(selectMenssage);
  const lostObjects = useAppSelector(selectLostObjects);
  const dispatch = useAppDispatch();
  const [isReclaimed, setIsReclaimed] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [storedUser, setStoredUser] = useState<UserData | null>(null);
  const [showNewMessageAlert, setShowNewMessageAlert] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setStoredUser(parsedUserData);
    }
  }, []);
  const userSender = lostObjects.find((item) => item.userReport?.email);

  const userRecipient = lostObjects.find((item) => item.userReclamed?.email);
  const markMessagesAsRead = () => {
    const unreadMessages = messages.filter(
      (msg) =>
        msg.lostObjectId === id &&
        msg.user.email !== storedUser?.email &&
        !msg.messageRead.length
    );

    unreadMessages.forEach((msg) => {
      dispatch(markMessageAsRead(msg.id));
    });
  };

  const selectedUser = storedUser;
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

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
          image:
            imageUrl && (imageUrl.startsWith("http") ? imageUrl : undefined),
          likes: 0,
          likedBy: [],
          lostObjectId: id,
          messageRead: false,
          userSender: userSender?.userReport,
          userRecipient: userRecipient?.userReclamed,
        };
        dispatch(markMessageAsRead(newMessage.id));
        dispatch(addMessage(newMessage));
        setInputMessage("");
        setImageUrl("");
        console.log("estoy en componente");
      }
    }
  };

  useEffect(() => {
    if (messages.length) {
      const hasNewMessage = messages.some(
        (msg, index) =>
          msg.lostObjectId === id &&
          index === messages.length - 1 &&
          msg.user.email !== storedUser?.email &&
          !msg.messageRead
      );
      setShowNewMessageAlert(hasNewMessage);
      if (hasNewMessage) {
        const timer = setTimeout(() => {
          setShowNewMessageAlert(false);
          markMessagesAsRead();
        }, 4 * 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [messages, storedUser, id]);
  const handleOpenDialog = (messageId: any) => {
    setSelectedMessageId(messageId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedMessageId(null);
    setIsDialogOpen(false);
  };
  const handleReportSent = () => {
    if (selectedMessageId && status !== "finalizado") {
      if (selectedUser && id) {
        const dataToReclaim = {
          userReclamed: selectedUser!,
          idLostObject: id,
          messageRead: true,
          status: "enviado",
        };
        dispatch(updateLostObjectStatus(dataToReclaim));
        setStatus("enviado");
        if (status === "enviado") {
          setIsReclaimed(true);
        }
      }
      handleCloseDialog();
    }
  };
  const handleReportReceived = () => {
    if (selectedMessageId && status !== "finalizado") {
      if (selectedUser && id) {
        const dataToReclaim = {
          userReclamed: selectedUser!,
          idLostObject: id,
          status: "recibido",
        };
        dispatch(updateLostObjectStatus(dataToReclaim));
        setStatus("finalizado");
        if (status === "recibido") {
          setStatus("finalizado");
          setIsReclaimed(true);
        }
      }
    }
    handleCloseDialog();
  };

  const filteredMessages = messages.filter((msg) => msg.lostObjectId === id);
  const isButtonDisabled = !selectedUser || inputMessage.trim() === "";
  const isStatusDisabled = status === "finalizado";

  return (
    <>
      <CustomNavbar />
      <Grid textAlign="center" mt={2}>
        <Typography variant="h4" component="h2">
          Chat Messenger
        </Typography>
      </Grid>
      <Card sx={{ width: "100%", maxWidth: 800, mx: "auto", mt: 2, mb: 5 }}>
        <Typography variant="h5" gutterBottom margin={2}>
          Bienvenido/a {selectedUser?.name.first}
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={2}
          mb={2}
        >
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg, index) => (
              <Card key={index} elevation={3} sx={{ width: "100%", mb: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                      src={msg.user.picture.thumbnail}
                      alt="Avatar"
                      sx={{ mr: 2 }}
                    />
                    <Typography variant="h6">
                      {msg.user.name.first} {msg.user.name.last}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>{msg.message}</Typography>
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Mensaje con imagen"
                        style={{ maxWidth: "100%" }}
                      />
                    )}
                    <Typography variant="caption" color="textSecondary" mt={1}>
                      Enviado: {new Date(msg.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Box>
                  {index === filteredMessages.length - 1 &&
                    showNewMessageAlert && (
                      <Box mt={1}>
                        <Badge badgeContent="Nuevo" color="secondary">
                          <MaiIcon color="action" />
                        </Badge>
                      </Box>
                    )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" mt={2}>
              No hay mensajes disponibles.
            </Typography>
          )}
        </Box>

        <Paper sx={{ p: 2, mt: 2, mb: 5 }}>
          <Typography variant="h5">Te ponemos en contacto</Typography>

          <TextField
            placeholder="Escribe tu mensaje aquí..."
            fullWidth
            minRows={3}
            variant="outlined"
            value={inputMessage}
            onChange={handleMessageChange}
            sx={{ mb: "2" }}
          />
          <TextField
            placeholder="Ingresa la URL de una imagen (opcional)"
            fullWidth
            variant="outlined"
            value={imageUrl}
            onChange={handleImageUrlChange}
            sx={{ mb: "2" }}
          />
        </Paper>

        <Box sx={{ display: "flex" }} mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog(filteredMessages[0]?.id)}
            disabled={isStatusDisabled}
          >
            Reportar envío/recibido
          </Button>
          <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>
              {selectedMessageId ? "Informar sobre el mensaje" : ""}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {selectedMessageId
                  ? "¿Has enviado o recibido el objeto?"
                  : "Seleccione un mensaje para informar."}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {selectedMessageId && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReportSent}
                    disabled={isReclaimed}
                  >
                    Informar enviado
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReportReceived}
                    disabled={isReclaimed}
                  >
                    Informar recibido
                  </Button>
                </>
              )}
              <Button onClick={handleCloseDialog}>Cancelar</Button>
            </DialogActions>
          </Dialog>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }} mt={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SendIcon />}
            onClick={handleCommentSubmit}
            disabled={isButtonDisabled || isStatusDisabled}
          >
            Enviar Mensaje
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default FoundObjects;
