import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllEmployees } from "../../services/employeeService"
import {
    assignTicket,
    updateTicket,
    deleteTicket,
} from "../../services/ticketService"
import "./Tickets.css"

export const Ticket = ({ ticket, currentUser, getAndSetTickets }) => {
    const [employees, setEmployees] = useState([])
    const [assignedEmployee, setAssignedEmployee] = useState({})

    useEffect(() => {
        getAllEmployees().then((response) => {
            setEmployees(response)
        })
    }, [])

    useEffect(() => {
        const foundEmployee = employees.find(
            (employee) => employee.id === ticket.employeeTickets[0]?.employeeId
        )
        setAssignedEmployee(foundEmployee)
    }, [employees, ticket])

    const handleClaim = () => {
        const currentEmployee = employees.find(
            (employee) => employee.userId === currentUser.id
        )

        const newEmployeeTicket = {
            employeeId: currentEmployee.id,
            serviceTicketId: ticket.id,
        }

        assignTicket(newEmployeeTicket).then(() => {
            getAndSetTickets()
        })
    }

    const handleClose = () => {
        // create current ticket object but set dateCompleted to new Date()
        const updatedServiceTicket = {
            id: ticket.id,
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: new Date(),
        }

        // put to serviceTickets/{ticket.id}
        updateTicket(updatedServiceTicket).then(() => {
            getAndSetTickets()
        })
    }

    const handleDelete = () => {
        deleteTicket(ticket).then(() => {
            getAndSetTickets()
        })
    }

    return (
        <section className="ticket" key={ticket.id}>
            <header className="ticket=info">
                <Link to={`/tickets/edit/${ticket.id}`}>#{ticket.id}</Link>
            </header>
            <div>{ticket.description}</div>
            <footer>
                <div>
                    <div className="ticket-info">assignee</div>
                    <div>
                        {assignedEmployee
                            ? assignedEmployee.user?.fullName
                            : "None"}
                    </div>
                </div>
                <div>
                    <div className="ticket-info">Emergency</div>
                    <div>{ticket.emergency ? "yes" : "no"}</div>
                </div>
                <div className="btn-container">
                    {currentUser.isStaff && !assignedEmployee ? (
                        <button
                            className="btn btn-secondary"
                            onClick={handleClaim}
                        >
                            Claim
                        </button>
                    ) : (
                        ""
                    )}
                    {assignedEmployee?.userId === currentUser.id &&
                    !ticket.dateCompleted ? (
                        <button className="btn-warning" onClick={handleClose}>
                            Close
                        </button>
                    ) : (
                        ""
                    )}
                    {!currentUser.isStaff && (
                        <button
                            className="btn btn-warning"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </footer>
        </section>
    )
}
