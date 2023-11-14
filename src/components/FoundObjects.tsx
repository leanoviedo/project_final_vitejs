import React, { useState } from "react";
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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CustomNavbar from "./CustomNavbar";
import { v4 as uuidv4 } from "uuid";
import { selectUserLogin } from "../redux/slices/UserLogin";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { addMessage, selectMenssage } from "../redux/slices/chatSlices";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateLostObjectStatus } from "../redux/slices/lostObjectSlice";
import { DataToReclaim } from "../model/interface";

const FoundObjects = () => {
  const selectedUser = useAppSelector(selectUserLogin);
  const messages = useAppSelector(selectMenssage);
  const dispatch = useAppDispatch();

  const [inputMessage, setInputMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

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
        };

        dispatch(addMessage(newMessage));
        setInputMessage("");
        setImageUrl("");
      }
    }
  };

  const handleOpenDialog = (messageId: any) => {
    setSelectedMessageId(messageId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedMessageId(null);
    setIsDialogOpen(false);
  };
  const handleReportSent = () => {
    if (selectedMessageId) {
      const dataToReclaim: DataToReclaim = {
        userReclamed: selectedUser!,
        idLostObject: id,
        status: "enviado",
      };
      dispatch(updateLostObjectStatus(dataToReclaim));
      setStatus("enviado");
      if (status === "enviado") {
        isStatusDisabled;
      }
    }
    handleCloseDialog();
  };

  const handleReportReceived = () => {
    if (selectedMessageId) {
      const dataToReclaim: DataToReclaim = {
        userReclamed: selectedUser!,
        idLostObject: id,
        status: "recibido",
      };

      dispatch(updateLostObjectStatus(dataToReclaim));
      setStatus("recibido");
    }
    if (status === "recibido") {
      setStatus("finalizado");
    }
    handleCloseDialog();
  };
  const filteredMessages = messages.filter((msg) => msg.lostObjectId === id);
  const isButtonDisabled = !selectedUser || inputMessage.trim() === "";
  const isStatusDisabled = status === "finalizado";

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

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ MarginTop: 2 }}
        >
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
        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
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
                  >
                    Informar enviado
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReportReceived}
                    disabled={isStatusDisabled}
                  >
                    Informar recibido
                  </Button>
                </>
              )}
              <Button onClick={handleCloseDialog}>Cancelar</Button>
            </DialogActions>
          </Dialog>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
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
