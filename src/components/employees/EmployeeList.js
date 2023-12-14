import { useState, useEffect } from "react"
import { User } from "../../users/User"
import "./EmployeeList.css"
import { getStaffUsers } from "../../services/userService"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getStaffUsers().then((employeesArray) => setEmployees(employeesArray))
    }, [])

    return (
        <div className="employees">
            {employees.map((employeeObj) => {
                return <User user={employeeObj} key={employeeObj.id} />
            })}
        </div>
    )
}
