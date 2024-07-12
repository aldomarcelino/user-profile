import React, { useState } from "react";
import { Box, Grid, Modal, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Button, TextField } from "components/elements";
import { Colors } from "styles/theme/color";
import { X } from "lucide-react";
import { userValidation } from "utils/validation";

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

const initialForm = {
  name: "",
  username: "",
  email: "",
  street: "",
  suite: "",
  city: "",
  zipcode: "",
  lat: "",
  lng: "",
  phone: "",
  compay_name: "",
  catchPhrase: "",
  bs: "",
};

const UserCreationModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  status,
}) => {
  // Initialize State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [form, setForm] = useState({ ...initialForm, website: "" });
  const [errors, setErrors] = useState({});

  const listType = ["personal", "address", "company"];

  // Event on change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Clear state handler
  const handleCancel = () => {
    setForm({ ...initialForm, website: "" });
    setError("");
    setErrors({});
    setLoading(false);
    setCurrentIdx(0);
    onClose();
  };

  // Handle create event form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentIdx(2);
    setError("");
    setErrors({});

    // Check empty field
    const temp = userValidation(form);
    if (!Object.keys(initialForm).every((key) => temp[key] == "")) {
      setErrors(temp);
      return;
    }
    setLoading(true);
  };

  // Handle Decrament
  const handleDecrementIdx = () => {
    if (currentIdx) setCurrentIdx(currentIdx - 1);
  };

  const handleIncrementIdx = () => {
    if (currentIdx < 3) setCurrentIdx(currentIdx + 1);
  };

  // Handle To show current section
  const handleWizard = () => {
    switch (currentIdx) {
      case 0:
        return (
          <Box
            display="flex"
            flexDirection="column"
            gap="13px"
            marginTop="24px"
          >
            <Box>
              <TextField
                label="Full Name*"
                name="name"
                value={form.name}
                handleChange={handleChange}
                placeholder="Jhon Dalton"
                errors={errors}
                width="100%"
              />
            </Box>
            <Box>
              <TextField
                label="Username*"
                name="username"
                value={form.username}
                handleChange={handleChange}
                placeholder="jhondoe"
                errors={errors}
                width="100%"
              />
            </Box>
            <Box>
              <TextField
                label="Email*"
                name="email"
                value={form.email}
                handleChange={handleChange}
                placeholder="jhondalton@mailinator.com"
                errors={errors}
                width="100%"
              />
            </Box>
            <Box>
              <TextField
                label="Phone Number*"
                name="phone"
                value={form.phone}
                handleChange={handleChange}
                placeholder="084203742380"
                errors={errors}
                width="100%"
              />
            </Box>
            <Box>
              <TextField
                label="Website"
                name="website"
                value={form.website}
                handleChange={handleChange}
                placeholder="https://jhondoe.org"
                errors={errors}
                width="100%"
              />
            </Box>
          </Box>
        );
      case 1:
        return (
          <Grid container margin="24px 0px 64px">
            <Grid item md={6} xs={12} paddingRight="5px">
              <Box display="flex" flexDirection="column" gap="13px">
                <Box>
                  <TextField
                    label="Street*"
                    name="street"
                    value={form.street}
                    handleChange={handleChange}
                    placeholder="Kulas Light"
                    errors={errors}
                    width="100%"
                  />
                </Box>
                <Box>
                  <TextField
                    label="Suite*"
                    name="suite"
                    value={form.suite}
                    handleChange={handleChange}
                    placeholder="Apt. 556"
                    errors={errors}
                    width="100%"
                  />
                </Box>
                <Box>
                  <TextField
                    label="City*"
                    name="city"
                    value={form.city}
                    handleChange={handleChange}
                    placeholder="New York"
                    errors={errors}
                    width="100%"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12} paddingLeft="5px">
              <Box display="flex" flexDirection="column" gap="13px">
                <Box>
                  <TextField
                    label="Zip Code*"
                    name="zipcode"
                    value={form.zipcode}
                    handleChange={handleChange}
                    placeholder="92998-3874"
                    errors={errors}
                    width="100%"
                  />
                </Box>
                <Box>
                  <TextField
                    label="Latitude*"
                    name="lat"
                    value={form.lat}
                    handleChange={handleChange}
                    placeholder="-37.3159"
                    type="number"
                    errors={errors}
                    width="100%"
                  />
                </Box>
                <Box>
                  <TextField
                    label="Longitude*"
                    name="lng"
                    type="number"
                    value={form.lng}
                    handleChange={handleChange}
                    placeholder="81.1496"
                    errors={errors}
                    width="100%"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        );

      default:
        return (
          <Box
            display="flex"
            flexDirection="column"
            gap="13px"
            marginTop="24px"
          >
            <Box>
              <TextField
                label="Company Name*"
                name="compay_name"
                value={form.compay_name}
                handleChange={handleChange}
                placeholder="Google Inc"
                errors={errors}
                width="100%"
              />
            </Box>
            <Box>
              <TextField
                label="Catch Phrase*"
                name="catchPhrase"
                value={form.catchPhrase}
                handleChange={handleChange}
                placeholder="Proactive didactic contingency"
                errors={errors}
                width="100%"
              />
            </Box>
            <Box>
              <TextField
                label="Business Segment*"
                name="bs"
                value={form.bs}
                handleChange={handleChange}
                placeholder="revolutionize end-to-end systems"
                errors={errors}
                width="100%"
              />
            </Box>
          </Box>
        );
    }
  };

  return (
    <Modal open={open} aria-labelledby="modal-user-creation">
      <Component width="643px" padding="32px">
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
          {`${status} User`}
        </Typography>
        <Typography variant="body2">
          Input form below to make your request.
        </Typography>
        {status === "Edit" && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="end"
            gap="3px"
          >
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
        )}

        <form onSubmit={handleSubmit}>
          {handleWizard()}

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
            marginTop="33px"
          >
            <Button
              label={currentIdx ? "Previous" : "Cancel"}
              padding="13px 32px"
              borderradius="20px"
              fontSize="18px"
              onClick={currentIdx ? handleDecrementIdx : handleCancel}
              buttontype="secondary"
            />
            <Button
              label={
                loading ? "Loading..." : currentIdx === 2 ? "Submit" : "Next"
              }
              padding="13px 32px"
              borderradius="20px"
              fontSize="18px"
              disabled={loading}
              onClick={handleIncrementIdx}
              submit={currentIdx === 3}
            />
          </Box>
        </form>
      </Component>
    </Modal>
  );
};

export default UserCreationModal;
