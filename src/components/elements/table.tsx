import React, { ReactNode } from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  Box,
} from "@mui/material";
import { Plus } from "lucide-react";
import { Colors } from "styles/theme/color";

interface ListHeadItem {
  id: number;
  title: string;
  align: "left" | "right" | "center" | "inherit" | "justify";
}

interface TabelProps {
  listHead: ListHeadItem[];
  isEmpty: boolean;
  children: ReactNode;
  onCLickAdd: () => void;
}

const Tabel: React.FC<TabelProps> = ({
  listHead,
  isEmpty,
  onCLickAdd,
  children,
}) => {
  return (
    <>
      <Table sx={{ borderCollapse: "separate", borderSpacing: "0 21px" }}>
        <TableHead sx={{ position: "relative" }}>
          <TableRow>
            {listHead.map((item) => (
              <TableCell
                align={item.align}
                key={`${item.id}-heading`}
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 550,
                  fontSize: 16,
                }}
              >
                {item.title}
              </TableCell>
            ))}
            <TableCell>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                top="16px"
                right="24px"
                borderRadius="7px"
                padding="3px"
                sx={{
                  backgroundColor: Colors.darkBlue,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.9 },
                }}
                onClick={onCLickAdd}
              >
                <Plus color={Colors.blue} />
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isEmpty ? (
            <TableRow>
              <TableCell colSpan={listHead.length}>
                <Typography margin="100px 0px" textAlign="center">
                  No data
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <>{children}</>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default Tabel;
