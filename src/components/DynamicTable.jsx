import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  CircularProgress,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DynamicDataTable = ({ columns, rows, actions = {}, isLoading }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table stickyHeader>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  sx={{
                    minWidth: column.minWidth || 100,
                    backgroundColor: "#7858C61A",
                    color: "#000000",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              {(actions.view || actions.edit || actions.delete) && (
                <TableCell
                  sx={{
                    backgroundColor: "#0D5F76",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <CircularProgress sx={{ color: "#000" }} />
              </TableCell>
            </TableRow>
          ) : (
            <>
              <TableBody>
                {rows.length > 0 ? (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow
                        hover
                        key={row.id || index}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "#ffffff" : "#F2F3F6BF",
                        }}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align || "left"}
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}

                        {(actions.view || actions.edit || actions.delete) && (
                          <TableCell>
                            {actions.view && (
                              <IconButton
                                color="primary"
                                onClick={() => actions.view(row)}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            )}
                            {actions.edit && (
                              <IconButton
                                color="secondary"
                                onClick={() => actions.edit(row)}
                              >
                                <EditIcon />
                              </IconButton>
                            )}
                            {actions.delete && (
                              <IconButton
                                color="error"
                                onClick={() => actions.delete(row)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} align="center">
                      No records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DynamicDataTable;
