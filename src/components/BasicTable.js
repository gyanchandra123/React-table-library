import React,{useMemo} from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./column";
import MOCK_DATA from "./MOCK_DATA.json";
import './table.css';

const BasicTable = () => {

  const columns = useMemo(() => COLUMNS, []) ;
  const data    = useMemo(()=> MOCK_DATA,[]) ; 

  const tableInstance = useTable({columns,data});

  const {  // below are prorerties && functions required from react-table instance.
      getTableProps, // function
      getTableBodyProps, //function
      headerGroups,      // array: contains informations regarding the table heading.
      rows,
      footerGroups,
      prepareRow
       } = tableInstance;
       return (
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      /* it picks up the data for each column for each row && render here */
                    })}
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              {footerGroups.map(footerGroup => (
                <tr {...footerGroup.getFooterGroupProps()}>
                  {footerGroup.headers.map(column => (
                    <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
        </>
      )
};

export default BasicTable;
