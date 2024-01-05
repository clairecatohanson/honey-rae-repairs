import "./Tickets.css"
import { Ticket } from "./Ticket"
import { FilterBar } from "./FilterBar"
import { useState, useEffect } from "react"
import { getAllTickets } from "../../services/ticketService"

export const TicketList = ({ currentUser }) => {
    const [allTickets, setAllTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const getAndSetTickets = () => {
        getAllTickets().then((ticketsArray) => {
            setAllTickets(ticketsArray)
        })
    }

    useEffect(() => {
        getAndSetTickets()
    }, [])

    useEffect(() => {
        if (showEmergencyOnly) {
            const emergencyTickets = allTickets.filter(
                (ticket) => ticket.emergency
            )
            setFilteredTickets(emergencyTickets)
        } else {
            setFilteredTickets(allTickets)
        }
    }, [showEmergencyOnly, allTickets])

    useEffect(() => {
        const foundTickets = allTickets.filter((ticket) =>
            ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredTickets(foundTickets)
    }, [searchTerm, allTickets])

    return (
        <>
            <div className="tickets-container">
                <h2>Tickets</h2>
                <FilterBar
                    setShowEmergencyOnly={setShowEmergencyOnly}
                    setSearchTerm={setSearchTerm}
                />
                <article className="tickets">
                    {filteredTickets.map((ticketObj) => {
                        return (
                            <Ticket
                                currentUser={currentUser}
                                ticket={ticketObj}
                                key={ticketObj.id}
                                getAndSetTickets={getAndSetTickets}
                            />
                        )
                    })}
                </article>
            </div>
        </>
    )
}
