import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { dataHoraFormatada } from "../../utils/formatarDataEHora";
import { Edit, Trash } from "lucide-react";

const TableComponent = ({ tHeaders, tBody, actions }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {tHeaders?.map((head) => (
              <TableCell key={head} sx={{ fontSize: "20px", fontWeight: "bold" }}>
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tBody?.map((rows, index) => (
            <TableRow key={index}>
              {Object.keys(rows).map((key, indexCell) => {
                let cellContent = rows[key];
                if (key === "createdAt" || key === "updatedAt") {
                  cellContent = dataHoraFormatada(rows[key]);
                }
                return (
                  <TableCell
                    title={cellContent}
                    key={indexCell}
                    sx={{
                      fontSize: "16px",
                      fontWeight: "normal",
                    }}
                  >
                    {cellContent}
                  </TableCell>
                );
              })}
              {actions && (
                <TableCell sx={{ display: "flex" }}>
                  <IconButton onClick={() => actions.onEdit(rows)}>
                    <Edit color="gray" />
                  </IconButton>
                  <IconButton onClick={() => actions.onDelete(rows)}>
                    <Trash color="red" />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
