import { useParams } from "react-router-dom"
import { getEmployeeByUserId } from "../../services/employeeService"
import { useState, useEffect } from "react"

export const EmployeeDetails = () => {
    const [employee, setEmployee] = useState({})
    const { employeeUserId } = useParams()

    useEffect(() => {
        getEmployeeByUserId(employeeUserId).then((employeeArray) => {
            const employeeObj = employeeArray[0]
            setEmployee(employeeObj)
        })
    }, [])

    return (
        <section className="employee">
            <header>
                <span className="employee-header">Name: </span>
                {employee.user?.fullName}
            </header>
            <div>
                <span className="employee-info">Email : </span>
                {employee.user?.email}
            </div>
            <div>
                <span className="employee-info">Specialty : </span>
                {employee.specialty}
            </div>
            <div>
                <span className="employee-info">Rate : </span>
                {employee.rate}
            </div>
            <footer>
                <span className="employee-footer">
                    Currently working on {employee.employeeTickets?.length}{" "}
                    tickets
                </span>
            </footer>
        </section>
    )
}
