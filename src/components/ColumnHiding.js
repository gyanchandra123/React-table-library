import React,{useMemo,useEffect} from "react";
import { useTable } from "react-table";
import { COLUMNS, } from "./column";
import MOCK_DATA from "./MOCK_DATA.json";
import './table.css';
import Checkbox from './Checkbox '

const ColumnHiding = () => {

  const columns = useMemo(() => COLUMNS, []) ;
  const data    = useMemo(()=> MOCK_DATA,[]) ; 

  const tableInstance = useTable({columns,data}); 

  const {  // below are prorerties && functions required from react-table instance.
      getTableProps, // function
      getTableBodyProps, //function
      headerGroups,      // array: contains informations regarding the table heading.
      rows,
      footerGroups,
      prepareRow,
      allColumns, // is the array of all the columns supply to our table
      getToggleHideAllColumnsProps // a method that allow to hide or show all columns at once.
       } = tableInstance;

       useEffect(() => {
        console.log('TABLE-INSTANCE VALUE :',tableInstance);
        console.log('HEADER-GROUPS VALUE :',headerGroups);
        console.log('ROWS VALUE :',rows)
     });
     
       return (
        <>
        <div>
            <div>
                <Checkbox {...getToggleHideAllColumnsProps()}></Checkbox> Toggle All
            </div>
            {allColumns.map(column =>(
                <div key={column.id}>
                    <label>
                        <input type='checkbox' {...column.getToggleHiddenProps()}/>
                        {column.Header}
                    </label>
                </div>
            ))}
        </div>
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

export default ColumnHiding;
