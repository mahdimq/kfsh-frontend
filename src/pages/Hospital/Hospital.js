import { Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import kfshAPI from '../../kfshAPI'


export default function Hospital() {
  const [loading, setLoading] = useState(true)
  const [procedures, setProcedures] = useState()
  const [testCodes, setTestCodes] = useState()
  const [locations, setLocations] = useState()
  const [departments, setDepartments] = useState()

  const fetchData = async() => {
    setLoading(true)

    try {
        const procedure = await kfshAPI.getProcedures()
        setProcedures(procedure)
        
        const location = await kfshAPI.getLocations()
        setLocations(location)
        
        const testcode = await kfshAPI.getTestCodes()
        setTestCodes(testcode)
       
        const department = await kfshAPI.getDepartments()
        setDepartments(department)

    } catch (error) {
      console.log('error', error)
    }
    setLoading(false)
  }
  

  useEffect(() => {
    fetchData()
  }, [])


  return (
    !loading && (
      <div>
      <Typography align="center" variant="h4" component="div">Hospital Component</Typography>

      <ul>
        <p>Procedures</p>
        {procedures.map(item => (
          <li key={item.id}>{item.id} - {item.procedure_name}</li>
          ))}
      </ul>

      <hr />
      
      <ul>
        <p>Locations</p>
        {locations.map(item => (
          <li key={item.id}>{item.id} - {item.location_name}</li>
          ))}
      </ul>

      <hr/>
      
      <ul>
        <p>Test Codes</p>
        {testCodes.map(item => (
          <li key={item.cpt}>{item.cpt} - {item.description}</li>
          ))}
      </ul>
      
      <hr/>

      <ul>
        <p>Departments</p>
        {departments.map(item => (
          <li key={item.id}>{item.id} - {item.department_name}</li>
          ))}
      </ul>
    </div>
  )
  )
}
