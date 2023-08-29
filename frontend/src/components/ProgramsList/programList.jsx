import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import CheckIcon from "@mui/icons-material/Check";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

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
      const difficultyComparison = difficultyOrder[a[orderBy]] - difficultyOrder[b[orderBy]];
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

const createData = (programCode, title, difficulty, status) => {
  return { programCode, title, difficulty, status };
};

const rows = [
  createData("TS01", "Two Sum", "Easy", "0"),
  createData("LC42", "Trapping Rain Water", "Hard", "1"),
  createData("FP10", "Fibonacci Series", "Medium", "0"),
  createData("BS25", "Binary Search", "Medium", "2"),
  createData("SG03", "String Manipulation", "Easy", "0"),
  createData("LC01", "Longest Common Subsequence", "Medium", "1"),
  createData("BST22", "Balanced Binary Tree", "Easy", "0"),
  createData("MS13", "Merge Sort", "Hard", "2"),
  createData("SS02", "Selection Sort", "Medium", "0"),
  createData("QS09", "Quick Sort", "Hard", "1"),
  createData("HB04", "Heapify Binary Tree", "Medium", "2"),
  createData("AT06", "Array Traversal", "Easy", "0"),
  createData("PM12", "Palindrome Check", "Medium", "1"),
  createData("GC08", "Graph Connectivity", "Hard", "0"),
  createData("BSR31", "Binary Search in Rotated Array", "Medium", "2"),
  createData("PZ17", "Puzzle Solving", "Easy", "0"),
  createData("DS11", "Data Structures Overview", "Easy", "1"),
  createData("DFS19", "Depth First Search", "Medium", "2"),
  createData("BP15", "Backtracking Problems", "Hard", "0"),
  createData("TST21", "Trie Data Structure", "Medium", "1"),
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;
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

  return (
  
     <Box sx={{ width: "100%" }}>
      <Paper sx={{ margin: "auto", width: "80%", overflow: "hidden" }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size= "small">
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
                            column.id !== "status" ? "1px solid #ddd" : "none",
                          color:
                            column.id === "difficulty"
                              ? row[column.id] === "Easy"
                                ? "#00c44d"
                                : row[column.id] === "Medium"
                                ? "#ffc226"
                                : "red"
                              : column.id === "status"
                              ? row[column.id] === "1"
                                ? "#00c44d" // Solved (green)
                                : row[column.id] === "2"
                                ? "#ffc226" // Attempted (yellow)
                                : "#777777" // Todo (dark grey)
                              : "inherit",
                        }}>
                        {column.id === "status" && row[column.id] === "1" ? (
                          <TaskAltIcon style={{ color: "#00c44d" }} />
                        ) : column.id === "status" && row[column.id] === "2" ? (
                          <CheckIcon style={{ color: "#ffc226" }} />
                        ) : column.id === "status" && row[column.id] === "0" ? (
                          <HorizontalRuleIcon style={{ color: "#777777" }} />
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
  );
};

export default ProgramList ;
