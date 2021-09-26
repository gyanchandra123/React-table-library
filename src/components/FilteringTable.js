import React,{useMemo,useEffect} from "react";
import { useTable,useGlobalFilter } from "react-table";
import { COLUMNS, } from "./column";
import GlobalFilter from "./GlobalFilter";
import MOCK_DATA from "./MOCK_DATA.json";
import './table.css';

const FilteringTable = () => {

  const columns = useMemo(() => COLUMNS, []) ;
  const data    = useMemo(()=> MOCK_DATA,[]) ; 

  const tableInstance = useTable({columns,data},useGlobalFilter); 

  const {  // below are prorerties && functions required from react-table instance.
      getTableProps, // function
      getTableBodyProps, //function
      headerGroups,      // array: contains informations regarding the table heading.
      rows,
      footerGroups,
      prepareRow,
      state,
      setGlobalFilter // use to change the value of the filter text
       } = tableInstance;

       useEffect(() => {
        console.log('TABLE-INSTANCE VALUE :',tableInstance);
        console.log('HEADER-GROUPS VALUE :',headerGroups);
        console.log('ROWS VALUE :',rows);
        console.log('table state VALUE :',state)
     });

     const {globalFilter} = state; // it's the filter text.
     
       return (
        <>
         <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
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
              {rows.map(row => {
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

export default FilteringTable;
