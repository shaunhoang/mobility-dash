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

const web3formsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const ContactFormPopup = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false); // To disable button during sending

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
        setIsSubmitted(false);
    }, 300);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true); // Disable submit button

    const formData = new FormData(event.currentTarget);
    
    formData.append("access_key", web3formsAccessKey);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            setIsSubmitted(true); // Show the success message
        } else {
            console.error("Submission Error:", data);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    } finally {
        setSubmitting(false); // Re-enable submit button
    }
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
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit'}
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>
    </>
  );
};

export default ContactFormPopup;