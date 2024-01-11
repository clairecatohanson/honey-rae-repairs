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
    const [showOpenOnly, setShowOpenOnly] = useState(false)

    const getAndSetTickets = () => {
        getAllTickets().then((ticketsArray) => {
            if (currentUser.isStaff) {
                setAllTickets(ticketsArray)
            } else {
                const customerTickets = ticketsArray.filter(
                    (ticket) => ticket.userId === currentUser.id
                )
                setAllTickets(customerTickets)
            }
        })
    }

    useEffect(() => {
        getAndSetTickets()
    }, [currentUser])

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

    useEffect(() => {
        if (showOpenOnly) {
            const openTickets = allTickets.filter(
                (ticket) => ticket.dateCompleted === ""
            )
            setFilteredTickets(openTickets)
        } else {
            setFilteredTickets(allTickets)
        }
    }, [showOpenOnly, allTickets])

    return (
        <>
            <div className="tickets-container">
                <h2>Tickets</h2>
                <FilterBar
                    currentUser={currentUser}
                    setShowEmergencyOnly={setShowEmergencyOnly}
                    setSearchTerm={setSearchTerm}
                    setShowOpenOnly={setShowOpenOnly}
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
