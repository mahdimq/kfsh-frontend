import React, {useState, useEffect, useMemo} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import BTable from 'react-bootstrap/Table';
import { useTable, useFilters, useSortBy } from 'react-table';
import { PatientData } from "./PatientData";

const Styles = styled.div`
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }

    td {
      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
        }
    }
  }
`

const  ageAccessor = (row) => {
	const today = new Date();
	const birthDate = new Date(row.dob);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
};

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, 
}) => {
  
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
      setValue(e.target.value)
  }

  const onBlur = () => {
      updateMyData(index, id, value)
  }

useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
  return <input value={value} onChange={onChange} onBlur={onBlur} style={{width: '120px', background: 'transparent'}} />
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
    style= {{width: '140px'}}
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) 
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}



function PatientsList() {
  const [data, setData] = useState(PatientData);
  const filterTypes = useMemo(
    () => ({

      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      Cell: EditableCell,
    }),
    []
  )

  const updateMyData = (rowIndex, columnId, value) => {
    try {
        setData(old =>
    
    old.map((row, index) => {
        if (index === rowIndex) {
        return {
            ...old[rowIndex],
            [columnId]: value,
        }
        }
        return row
    })
    )
} catch (err) {
    console.log(`Unable to update field`, 'danger');
}
}

  const columns = useMemo(
    () => [
        {
            Header: 'MRN',
            accessor:'mrn', 
        },
        {
            Header: 'Full Name',
            accessor:'fullname',
        },
        {
            Header: 'Date of Birth',
            accessor:'dob',
        },
        {
            Header: 'Gender',
            accessor:'gender',

        },
        {
            Header: 'Age',
            accessor: ageAccessor,
        },
        {
            Header: 'Nationality',
            accessor:'nationality',
        },      
        {
          Header: 'Actions',
          Cell: tableProps => {
              return (
                  <button onClick= {()=>  {
                      try {
                      const dataCopy = [...PatientData]
                      dataCopy.splice(tableProps.row.index, 1);
                      setData(dataCopy);
                    } catch(err) {
                      console.log('Error deleting the row', 'danger');
                  }
                      }}>
                      <i className="far fa-trash-alt"></i></button>
              )
          },
        }
      ]
    , [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        } = useTable({
        columns,
        data: data,
        defaultColumn,
        filterTypes,
        updateMyData,
        },useFilters,useSortBy)


  return (
    <Styles>
    <div className="container-fluid" style= {{marginTop: '30px'}}>
    <div style= {{marginTop: '30px' }}>
    <BTable striped hover {...getTableProps()}>
    <thead>
    {headerGroups.map(headerGroup => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map(column => (
          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
            {column.render('Header')}
            <span>
              {column.isSorted
                ? column.isSortedDesc
                  ? ' 🔽'
                  : ' 🔼'
                : ''}
            </span>
            <div>{column.canFilter ? column.render('Filter') : null}</div>
          </th>
        ))}
      </tr>
    ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map((row, i) => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()}>
          {row.cells.map(cell => {
            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
          })}
        </tr>
        )
      })}
    </tbody>
 </BTable>
 </div>
 </div>
 </Styles>
  )
}

export default PatientsList;
