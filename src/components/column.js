import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";
export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    Footer: "Id",
    disableFilters: true,
    //Filter:ColumnFilter
  },
  {
    Header: "first Name",
    accessor: "first_name",
    Footer: "first Name",
  },
  {
    Header: "last  Name",
    accessor: "last_name",
    Footer: "last  Name",
  },
  {
    Header: "Date of Birth",
    accessor: "date_of_birth",
    Footer: "Date of Birth",
    Cell: ({ value }) => {
      // it transform the raw values of column
      return format(new Date(value), "dd/MM/yyyy"); // here new date() is used to convert the string date format to date object
    },
  },
  {
    Header: "Country",
    accessor: "country",
    Footer: "Country",
  },
  { Header: "Phone", accessor: "phone", Footer: "Phone" },
];

/* export const GROUPED_COLUMNS = [
  { Header: "Id", accessor: "id", Footer: "Id" },
  {
    Header: "name",
    Footer: "name",
    columns: [
      { Header: "first Name", accessor: "first_name", Footer: "first Name" },
      { Header: "last  Name", accessor: "last_name", Footer: "last  Name" },
    ],
  },
  {
    Header: "info",
    Footer: "info",
    columns: [
      {
        Header: "Date of Birth",
        accessor: "date_of_birth",
        Footer: "Date of Birth",
      },
      { Header: "Country", accessor: "country", Footer: "Country" },
      { Header: "Phone", accessor: "phone", Footer: "Phone" },
    ],
  },
]; */
