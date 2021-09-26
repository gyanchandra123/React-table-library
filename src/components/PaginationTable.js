import React, { useMemo, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { COLUMNS } from "./column";
import MOCK_DATA from "./MOCK_DATA.json";
import "./table.css";

const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 2 } },
    usePagination
  );
  // initialState : allow us to jump to a particular page on initial page -reload.
  const {
    // below are prorerties && functions required from react-table instance.
    getTableProps, // function
    getTableBodyProps, //function
    headerGroups, // array: contains informations regarding the table heading.
    //rows,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
    pageOptions,
    setPageSize,
    state,
    prepareRow,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  useEffect(() => {
    console.log("TABLE-INSTANCE VALUE :", tableInstance);
    console.log("HEADER-GROUPS VALUE :", headerGroups);
    console.log("ROWS/page  VALUE :", page);
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
          {page.map((row) => {
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
      </table>
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>

        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>

        {/* DECIDE THE PAGE SIZE : */}
        <select // for page size choice
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>

        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          previous
        </button>

        <button onClick={() => nextPage()} disabled={!canNextPage}>
          next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </>
  );
};

export default PaginationTable;
