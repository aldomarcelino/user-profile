import React, { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Colors } from "styles/theme/color";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const Component = styled(Box)(
  ({ width, padding }) => `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${width};
  background-color: ${Colors.white};
  box-shadow: 0px 10px 40px rgba(164, 149, 107, 0.1);
  padding: ${padding};
  border-radius: 20px;
  outline: none;
`
);

const VerificationModal: React.FC<ModalProps> = ({ open, onClose }) => {
  // Initialize State
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Clear state handler
  const handleCancel = () => {
    setError("");
    setReason("");
    setLoading(false);
    onClose();
  };

  // Handle create event form
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
  };

  return (
    <Modal open={open} aria-labelledby="modal-verify-action">
      <Component width="544px" padding="32px">
        <Box position="relative">
          <Box
            position="absolute"
            right="0"
            top="0"
            zIndex="1"
            style={{ cursor: "pointer" }}
            onClick={handleCancel}
          >
            <X size={24} />
          </Box>
        </Box>

        <Typography variant="h3" fontWeight={600} fontSize="32px">
          Are You Sure ?
        </Typography>
        <Typography variant="body2" marginBottom="40px">
          {`By clicking the button below  you will 'Delete' this user.`}
        </Typography>

        <Typography
          variant="body2"
          color={Colors.red100}
          margin="8px 0px"
          textAlign="center"
        >
          {error}
        </Typography>

        <Box justifyContent="center" marginTop="24px">
          <Box
            display="flex"
            padding="13px"
            justifyContent="center"
            borderRadius="11px"
            width="100%"
            sx={{
              backgroundColor: Colors.red100,
              color: Colors.white,
              cursor: "pointer",
              "&:hover": {
                opacity: 0.9,
              },
            }}
            onClick={handleSubmit}
          >
            {loading ? "Loading" : "Delete"}
          </Box>
        </Box>
      </Component>
    </Modal>
  );
};

export default VerificationModal;
