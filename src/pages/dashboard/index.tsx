import React, { useEffect, useState } from "react";
import { Box, Container, TableCell, TableRow } from "@mui/material";
import { Menu, Pagination, SearchBar, Table } from "components/elements";
import { Colors } from "styles/theme/color";
import { EllipsisVertical } from "lucide-react";
import ProfileDetailModal from "components/layout/modal/detail-profile-modal";
import VerificationModal from "components/layout/modal/verify-action-modal";
import UserCreationModal from "components/layout/modal/user-creation-modal";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  selectUserList,
  setUserDetail,
  setUserList,
} from "store/reducer/user-profile";

interface ListHead {
  id: number;
  title: string;
  align: "left" | "right" | "center" | "inherit" | "justify";
}

const Dashboard = () => {
  const dispatch = useAppDispatch();
  // Initialize State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIdx, setCurrentIdx] = useState(1);
  const [dataLimit] = useState(5);
  const [_, setError] = useState("");

  // Data from global state
  const data = useAppSelector(selectUserList);

  const listHead: ListHead[] = [
    {
      id: 1,
      title: "Name",
      align: "left",
    },
    {
      id: 2,
      title: "Email",
      align: "left",
    },
    {
      id: 3,
      title: "Phone Number",
      align: "left",
    },
    {
      id: 4,
      title: "Website",
      align: "left",
    },
    {
      id: 5,
      title: "Company",
      align: "left",
    },
  ];

  const itemList = [
    {
      id: 1,
      label: "Edit",
      handleClick: () => {
        setShowCreationModal(true);
        setStatus("Edit");
      },
    },
    { id: 2, label: "Delete", handleClick: () => setShowDeleteModal(true) },
  ];

  // Paginated the lsit
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    const final = data?.slice(startIndex, endIndex);
    return final;
  };

  // Get Users
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Something's wrong!`);
        }
        const data = await response.json();

        const temp = data.map((v: any, idx: number) => ({
          ...v,
          imageUrl: `https://picsum.photos/id/${
            idx + Math.floor(Math.random() * 100)
          }/200`,
        }));

        dispatch(setUserList(temp));
      } catch (error: any) {
        setError(error);
      }
    };

    // Call
    setTimeout(() => {
      getUsers();
    }, 1500);
  }, []);

  return (
    <>
      <Container fixed={true} maxWidth={"lg"} sx={{ padding: "100px" }}>
        <Box padding="0px 12px" position="relative">
          {/* Search Bar */}
          <SearchBar
            search={search}
            setSearch={setSearch}
            resetPage={setCurrentPage}
          />

          {/* START - Table */}
          <Table
            listHead={listHead}
            isLoading={!data}
            isEmpty={data && data?.length === 0}
            onCLickAdd={() => {
              setShowCreationModal(true);
              setStatus("Create");
            }}
          >
            {getPaginatedData()
              ?.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase())
              )
              ?.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "white",
                    transition: "0.5s all ease",
                    "&:hover": {
                      boxShadow: Colors.shadowLightBlue,
                    },
                    "& td, & th": {
                      border: 0,
                      overflow: "hidden",
                      color: Colors.darkGrey,
                    },
                  }}
                  onClick={() => {
                    dispatch(setUserDetail(item));
                    setShowProfileModal(true);
                  }}
                >
                  <TableCell
                    align="left"
                    sx={{
                      borderTopLeftRadius: "9px",
                      borderBottomLeftRadius: "9px",
                    }}
                  >
                    <Box
                      display="flex"
                      gap={2}
                      alignItems="center"
                      sx={{ color: Colors.black, fontWeight: 500 }}
                    >
                      <img
                        alt={item.name}
                        src={item.imageUrl}
                        style={{
                          height: 44,
                          width: 44,
                          borderRadius: 44,
                          objectFit: "cover",
                        }}
                      />
                      {item.name}
                    </Box>
                  </TableCell>
                  <TableCell align="left">{item.email}</TableCell>
                  <TableCell align="left">{item.phone}</TableCell>
                  <TableCell align="left" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={"https://" + item.website}
                      target="_blank"
                      style={{ color: Colors.blue100 }}
                    >
                      {item.website}
                    </a>
                  </TableCell>
                  <TableCell align="left">{item.company.name}</TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      borderTopRightRadius: "9px",
                      borderBottomRightRadius: "9px",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIdx(item.id);
                    }}
                  >
                    <Menu
                      menuItems={itemList}
                      width="180px"
                      buttonBase={
                        <EllipsisVertical
                          style={{ cursor: "pointer" }}
                          color={Colors.black}
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
          </Table>
          {/* END - Table */}
        </Box>

        {/* START - Pagination */}
        {data?.length && (
          <Box display="flex" justifyContent="end" margin="32px 0px">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageLimit={Math.ceil(
                (search
                  ? data?.filter((user) =>
                      user.name.toLowerCase().includes(search.toLowerCase())
                    ).length
                  : data?.length) / dataLimit
              )}
            />
          </Box>
        )}
        {/* END - Pagination */}
      </Container>

      {/* START - Profile Modal */}
      <ProfileDetailModal
        open={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
      {/* END - Profile Modal */}

      {/* START - Delete User Modal */}
      <VerificationModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        id={currentIdx}
      />
      {/* END - Delete User Modal */}

      {/* START - Creation User Modal */}
      <UserCreationModal
        open={showCreationModal}
        onClose={() => setShowCreationModal(false)}
        status={status}
        setStatus={setStatus}
        id={currentIdx}
      />
      {/* END - Creation User Modal */}
    </>
  );
};

export default Dashboard;
