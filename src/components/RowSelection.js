import React, { useMemo, useEffect } from "react";
import { useTable, useRowSelect } from "react-table";
import { COLUMNS } from "./column";
import MOCK_DATA from "./MOCK_DATA.json";
import "./table.css";
import Checkbox from "./Checkbox ";

const RowSelection = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const tableInstance = useTable({ columns, data }, useRowSelect, (hooks) => {
    hooks.visibleColumns.push((columns) => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <Checkbox {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
      },
      ...columns,
    ]);
  });

  const {
    // below are prorerties && functions required from react-table instance.
    getTableProps, // function
    getTableBodyProps, //function
    headerGroups, // array: contains informations regarding the table heading.
    rows, 
    prepareRow,
    selectedFlatRows, // it gives us flat array of rows that are selected in our table
  } = tableInstance;

  const firstPageRows = rows.slice(0, 10); // to select only 10 data

  useEffect(() => {
    console.log("TABLE-INSTANCE VALUE :", tableInstance);
    console.log("HEADER-GROUPS VALUE :", headerGroups);
    console.log("ROWS VALUE :", rows);
  });

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} id={column.id}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} id={row.values.first_name}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </td>
                  );
                  /* it picks up the data for each column for each row && render here */
                })}
              </tr>
            );
          })}
        </tbody> 

        {/* displaying the selected row data */}
        <pre>
          <code>
            {JSON.stringify(
              {
                selectedFlatRows: selectedFlatRows.map((row) => row.original),
              },
              null,
              2
            )}
          </code>
        </pre>
      </table>
    </>
  );
};

export default RowSelection;
