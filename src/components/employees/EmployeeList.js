import { useState, useEffect } from "react"
import { User } from "../users/User"
import "./Employees.css"
import { getStaffUsers } from "../../services/userService"
import { Link } from "react-router-dom"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getStaffUsers().then((employeesArray) => setEmployees(employeesArray))
    }, [])

    return (
        <div className="employees">
            {employees.map((employeeObj) => {
                return (
                    <Link to={`/employees/${employeeObj.id}`}>
                        <User user={employeeObj} key={employeeObj.id} />
                    </Link>
                )
            })}
        </div>
    )
}
