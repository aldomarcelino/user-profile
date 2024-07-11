import React, { useState } from "react";
import { Box, Grid, Modal, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Button, Select, TextField } from "components/elements";
import { Colors } from "styles/theme/color";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  status: string;
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

const UserCreationModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  status,
}) => {
  // Initialize State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [form, setForm] = useState({
    name: "",
    type: "",
    location: "",
  });

  const listType = ["personal", "address", "company"];

  // Event on change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Clear state handler
  const handleCancel = () => {
    setForm({
      name: "",
      type: "",
      location: "",
    });
    setError("");
    setLoading(false);
    onClose();
  };

  // Handle create event form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  };

  return (
    <Modal open={open} aria-labelledby="modal-user-creation">
      <Component width="643px" padding="32px">
        <Typography variant="h3" fontWeight={600} fontSize="32px">
          {`${status} User`}
        </Typography>
        <Typography variant="body2">
          Input form below to make your request.
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="end" gap="3px">
          {listType.map((val, index) => (
            <Box
              padding="3px 7px"
              borderRadius="7px"
              border={`1px solid ${Colors.darkBlue}`}
              bgcolor={index === currentIdx ? Colors.darkBlue : Colors.white}
              onClick={() => setCurrentIdx(index)}
              sx={{ cursor: "pointer" }}
            >
              <Typography
                color={index === currentIdx ? Colors.white : Colors.darkBlue}
              >
                {val}
              </Typography>
            </Box>
          ))}
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item md={6}>
              <TextField
                label="Event name"
                name="name"
                value={form.name}
                handleChange={handleChange}
                placeholder="July Healthy Fair"
                width="100%"
              />
              <TextField
                label="Event name"
                name="name"
                value={form.name}
                handleChange={handleChange}
                placeholder="July Healthy Fair"
                width="100%"
              />
              <TextField
                label="Event name"
                name="name"
                value={form.name}
                handleChange={handleChange}
                placeholder="July Healthy Fair"
                width="100%"
              />

              <Box marginTop="24px">
                <TextField
                  name="location"
                  value={form.location}
                  handleChange={handleChange}
                  label="Location"
                  placeholder="Jl. Harbour Bay,  Kepulauan Riau 29444"
                  width="100%"
                />
              </Box>
            </Grid>
            <Grid item md={6}></Grid>
          </Grid>

          <Typography
            variant="body2"
            color={Colors.red100}
            marginBottom="8px"
            textAlign="center"
          >
            {error}
          </Typography>

          <Box
            display="flex"
            gap="13px"
            justifyContent="center"
            marginTop="24px"
          >
            <Button
              label="Cancel"
              padding="13px 32px"
              borderRadius="20px"
              fontSize="18px"
              onClick={handleCancel}
              buttonType="secondary"
            />
            <Button
              label={loading ? "Loading..." : "Submit"}
              padding="13px 32px"
              borderRadius="20px"
              fontSize="18px"
              disabled={loading}
              submit
            />
          </Box>
        </form>
      </Component>
    </Modal>
  );
};

export default UserCreationModal;
