import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { dataHoraFormatada } from "../../utils/formatarDataEHora";
import { categoriaServices } from "../../services/categoriaServices";

const TableComponent = ({ tHeaders, tBody }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow key={0}>
            {tHeaders?.map((head) => (
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>{head}</TableCell>
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
                  <TableCell title={cellContent} key={indexCell} sx={{ fontSize: "15px", fontWeight: "normal" }}>
                    {cellContent}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
