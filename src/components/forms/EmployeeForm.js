import { useState, useEffect } from "react"
import "./Forms.css"
import {
    getEmployeeByUserId,
    updateEmployee,
} from "../../services/employeeService"
import { useNavigate } from "react-router-dom"

export const EmployeeForm = ({ currentUser }) => {
    const [employee, setEmployee] = useState({})

    useEffect(() => {
        currentUser.id
            ? getEmployeeByUserId(currentUser.id).then((data) => {
                  const currentEmployee = data[0]
                  setEmployee(currentEmployee)
              })
            : setEmployee({})
    }, [currentUser])

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const stateCopy = { ...employee }
        stateCopy[event.target.name] = event.target.value
        setEmployee(stateCopy)
    }

    const handleSave = (event) => {
        event.preventDefault()

        const editedEmployee = {
            id: employee.id,
            specialty: employee.specialty,
            rate: employee.rate,
            userId: employee.userId,
        }

        updateEmployee(editedEmployee).then(() => {
            navigate(`/employees/${currentUser.id}`)
        })
    }

    return (
        <form className="profile">
            <h2>Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty-input">Specialty:</label>
                    <input
                        id="specialty-input"
                        name="specialty"
                        type="text"
                        value={employee.specialty ? employee.specialty : ""}
                        required
                        className="form-control"
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="rate-input">Rate:</label>
                    <input
                        id="rate-input"
                        name="rate"
                        type="number"
                        value={employee.rate ? employee.rate : 0}
                        required
                        className="form-control"
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button
                        className="form-btn btn-primary"
                        onClick={handleSave}
                    >
                        Save Profile
                    </button>
                </div>
            </fieldset>
        </form>
    )
}
