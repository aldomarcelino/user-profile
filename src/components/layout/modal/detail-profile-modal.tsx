import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Colors } from "styles/theme/color";
import { StaticMap } from "components/elements";
import { Building, Dot, Globe, Mail, Phone } from "lucide-react";
import { useAppDispatch, useAppSelector } from "hooks";
import { selectUserDetail, setUserDetail } from "store/reducer/user-profile";

interface ProfileModalProps {
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

const ProfileDetailModal: React.FC<ProfileModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  // Get user detail from global state
  const data = useAppSelector(selectUserDetail);

  // Clear state handler
  const handleCancel = () => {
    dispatch(setUserDetail(null));
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCancel} aria-labelledby="profile-modal">
      {!data ? (
        <Typography>Loading...</Typography>
      ) : (
        <Component width="711px" padding="32px">
          <Box
            display="flex"
            justifyContent="center"
            position="absolute"
            width="100%"
            top={-65}
            left={0}
          >
            <img
              alt="profile"
              src={data.imageUrl}
              style={{
                height: 131,
                width: 131,
                borderRadius: 131,
                objectFit: "cover",
                boxShadow: Colors.shadowSecond,
              }}
            />
          </Box>

          <Typography
            variant="h3"
            fontSize="32px"
            textAlign="center"
            marginTop="54px"
            fontWeight={550}
          >
            {`${data.name} (${data.username})`}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="5px"
            margin="7px 0px"
          >
            <Globe size={17} />
            <a href={data.website || ""} target="_blank">
              <Typography variant="body2" color={Colors.blue100}>
                {data.website || " - "}
              </Typography>
            </a>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="9px"
          >
            <Box display="flex" alignItems="center" gap="5px">
              <Mail size={17} />
              <Typography variant="body2" color={Colors.darkBlue}>
                {data.email}
              </Typography>
            </Box>
            <Dot />
            <Box display="flex" alignItems="center" gap="5px">
              <Phone size={17} />
              <Typography variant="body2" color={Colors.darkBlue}>
                {data.phone}
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="5px"
            marginTop="31px"
          >
            <Building size={45} />
            <Box>
              <Typography
                variant="body2"
                color={Colors.darkBlue}
                fontWeight={600}
                fontSize={18}
              >
                {data.company.name}
              </Typography>
              <Typography
                variant="body2"
                color={Colors.darkBlue}
                fontWeight={200}
              >
                {`Bussines Strategy: ${data.company.name}`}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="body2"
            color={Colors.darkBlue}
            textAlign="center"
            marginTop="3px"
            marginBottom="24px"
          >
            {`Motto: ${data.company.catchPhrase}`}
          </Typography>

          <StaticMap
            id="location"
            size="600x960"
            lat={Number(data.address.geo.lat)}
            lng={Number(data.address.geo.lng)}
            width="100%"
            height="240px"
            borderRadius="20px"
          />

          <Typography variant="body2" color={Colors.darkBlue}>
            {`Address: ${data.address.street}, ${data.address.suite}, ${data.address.city}, ${data.address.zipcode}`}
          </Typography>
        </Component>
      )}
    </Modal>
  );
};

export default ProfileDetailModal;
