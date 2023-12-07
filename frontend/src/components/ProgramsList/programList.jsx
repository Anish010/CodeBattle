import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { useNavigate } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import CheckIcon from "@mui/icons-material/Check";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import Lottie from "react-lottie";
import logoIcon from "../../animations/logo_icon.json";
import { BASE_URL } from "../../services/rootServices";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { resetUser } from "../../reducers/userReducer"
import { useDispatch } from "react-redux";

const columns = [
  { id: "slNo", label: "#", align: "center", minWidth: 20 },
  { id: "programCode", label: "Program Code", align: "center", minWidth: 10 },
  {
    id: "title",
    label: "Title",
    minWidth: 400,
    align: "center",
  },
  {
    id: "difficulty",
    label: "Difficulty",
    minWidth: 80,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  if (orderBy === "difficulty") {
    return (a, b) => {
      const difficultyOrder = { Easy: 0, Medium: 1, Hard: 2 };
      const difficultyComparison =
        difficultyOrder[a[orderBy]] - difficultyOrder[b[orderBy]];
      return order === "asc" ? difficultyComparison : -difficultyComparison;
    };
  }

  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={{ ...visuallyHidden }}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const ProgramList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("slNo");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user.id);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  
  useEffect(() => {
  const authToken = Cookies.get("authToken");
  if (!authToken) {
    navigate("/");
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  axios
    .post(`${BASE_URL}/questions`, { userId }, config)
    .then((response) => {
      console.log(response.data.questions);
      setRows(response.data.questions);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 401) {
        // Unauthorized, clear authToken and redirect to login
        localStorage.clear();
        Cookies.remove("authToken");
        dispatch(resetUser());
        navigate("/");
      } else {
        // Handle other errors as needed
      }
    });
}, [userId, dispatch, navigate]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const dataRows = rows.map((row, index) => ({
    ...row,
    slNo: index + 1,
  }));

  const visibleRows = React.useMemo(
    () =>
      stableSort(dataRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, dataRows]
  );

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: logoIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {loading ? (
        <Lottie options={defaultOptions} height={400} width={400} />
      ) : (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ margin: "auto", width: "80%", overflow: "hidden" }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small">
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.programCode}
                        sx={{ cursor: "pointer" }}>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              borderBottom: "1px solid #ddd",
                              borderRight:
                                column.id !== "status"
                                  ? "1px solid #ddd"
                                  : "none",
                              color:
                                column.id === "difficulty"
                                  ? row[column.id] === "Easy"
                                    ? "#00c44d"
                                    : row[column.id] === "Medium"
                                    ? "#ffc226"
                                    : "red"
                                  : "inherit",
                            }}>
                            {column.id === "title" ? (
                              <Link
                                to={`/editor/${row.questionId}`}
                                color="inherit" // Inherit the link color
                              >
                                {row[column.id]}
                              </Link>
                            ) : column.id === "status" ? (
                              // Conditionally render icons based on 'status' value
                              row[column.id] === "1" ? (
                                <TaskAltIcon style={{ color: "#00c44d" }} />
                              ) : row[column.id] === "2" ? (
                                <CheckIcon style={{ color: "#ffc226" }} />
                              ) : (
                                <HorizontalRuleIcon
                                  style={{ color: "#777777" }}
                                />
                              )
                            ) : (
                              row[column.id]
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      )}
    </>
  );
};

export default ProgramList;
