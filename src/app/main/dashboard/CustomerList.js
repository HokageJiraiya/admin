import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import makeStyles from "@mui/styles/makeStyles";
const useStyles = makeStyles({
  toolbar: {
    "& > p:nth-of-type(1)": {
      fontSize: "15px",
    },
    "& > p:nth-of-type(2)": {
      fontSize: "15px",
    },
    "& > div:nth-of-type(2)": {
      fontSize: "15px",
    },
  },
});

const columns = [
  {
    id: "profile_image",
    label: "Photo",
    minWidth: 170,
    renderCell: (params) => <img src={params.value} />,
  },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "username",
    label: "User Name",
    minWidth: 170,
    align: "right",
  },
  {
    id: "email",
    label: "Email ID",
    minWidth: 170,
    align: "right",
  },
  {
    id: "company_name",
    label: "Company",
    minWidth: 170,
    align: "right",
  },
];
export default function CustomerList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  React.useEffect(() => {
    function createData(custData) {
      let name = `${custData.first_name} ${custData.last_name}`;
      let arr = {
        id: custData.id,
        profile_image: (
          <img
            style={{ width: "90px", height: "90px", borderRadius: "100%" }}
            src={
              custData.profile_image ? custData.profile_image : "/img/user.png"
            }
          />
        ),
        name: name,
        username: custData.username ? custData.username : "-",
        email: custData.email ? custData.email : "-",
        company_name: custData.company_name ? custData.company_name : "-",
      };
      //console.log(arr);
      return arr;
    }
    const fetchUsersData = async () => {
      await axios
        .get("http://localhost:8081/admin/getUsers", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTION",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            Authorization: window.localStorage.getItem("jwt_access_token"),
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          let newData = data.map((custData) => {
            return createData(custData);
          });
          setRows(newData);
          setLoader(false);
          return;
        });
    };
    fetchUsersData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const classes = useStyles();
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          {loader ? (
            <>
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            </>
          ) : (
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{ fontSize: 15 }}
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              sx={{ fontSize: 15 }}
                              key={column.id}
                              align={column.align}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <TablePagination
          classes={{
            toolbar: classes.toolbar,
            caption: classes.caption,
          }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
