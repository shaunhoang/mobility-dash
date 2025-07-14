import EmailIcon from '@mui/icons-material/Email';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';

const ContactFormPopup = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson); // Note to self: Data processing placeholder
    setIsSubmitted(true);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="contact"
        onClick={handleClickOpen}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <EmailIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        {isSubmitted ? (
          /* CONFIRMATION */
          <div>
            <DialogTitle>Thank You!</DialogTitle>
            <DialogContent>
              <Typography>Your message has been sent successfully.</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </div>
        ) : (
          /* CONTACT FORM */
          <form onSubmit={handleSubmit}>
            <DialogTitle>Contact Us</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Full Name"
                type="text"
                fullWidth
                variant="outlined"
              />
              <TextField
                required
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
              />
              <TextField
                required
                margin="dense"
                id="message"
                name="message"
                label="Message"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        )}
      </Dialog>
    </>
  );
};

export default ContactFormPopup;