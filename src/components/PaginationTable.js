import React,{useMemo,useEffect} from "react";
import { useTable,usePagination } from "react-table";
import { COLUMNS, } from "./column";
import MOCK_DATA from "./MOCK_DATA.json";
import './table.css';

const PaginationTable = () => {

  const columns = useMemo(() => COLUMNS, []) ;
  const data    = useMemo(()=> MOCK_DATA,[]) ; 

  const tableInstance = useTable({columns,data},usePagination); 

  const {  // below are prorerties && functions required from react-table instance.
      getTableProps, // function
      getTableBodyProps, //function
      headerGroups,      // array: contains informations regarding the table heading.
      //rows, 
      page,
      prepareRow
       } = tableInstance;

       useEffect(() => {
        console.log('TABLE-INSTANCE VALUE :',tableInstance);
        console.log('HEADER-GROUPS VALUE :',headerGroups);
        console.log('ROWS/page  VALUE :',page)
     });
     
       return (
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => ( 
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} id={column.id}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()} id={row.values.first_name}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()} key={cell.column.id}>{cell.render('Cell')}</td>
                      /* it picks up the data for each column for each row && render here */
                    })}
                  </tr>
                )
              })}
            </tbody> 
          </table>
        </>
      )
};

export default PaginationTable;
