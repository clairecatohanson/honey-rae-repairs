import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getCurrentTicket, updateTicket } from "../../services/ticketService"

export const EditTicketForm = () => {
    const { ticketId } = useParams()
    const navigate = useNavigate()

    const [currentTicket, setCurrentTicket] = useState({})

    useEffect(() => {
        getCurrentTicket(ticketId).then((ticketObj) => {
            setCurrentTicket(ticketObj)
        })
    }, [ticketId])

    const handleUpdate = (event) => {
        event.preventDefault()

        if (currentTicket.description) {
            updateTicket(currentTicket).then(() => {
                navigate("/tickets")
            })
        } else {
            window.alert("Please fill out the description")
        }
    }

    return (
        <form>
            <h2>Edit Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={
                            currentTicket.description
                                ? currentTicket.description
                                : ""
                        }
                        onChange={(event) => {
                            const ticketObjCopy = { ...currentTicket }
                            ticketObjCopy.description = event.target.value
                            setCurrentTicket(ticketObjCopy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>
                        Emergency:
                        <input
                            type="checkbox"
                            checked={
                                currentTicket.emergency
                                    ? currentTicket.emergency
                                    : false
                            }
                            onChange={(event) => {
                                const ticketObjCopy = { ...currentTicket }
                                ticketObjCopy.emergency = event.target.checked
                                setCurrentTicket(ticketObjCopy)
                            }}
                        />
                    </label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button
                        className="form-btn btn-info"
                        onClick={handleUpdate}
                    >
                        Update Ticket
                    </button>
                </div>
            </fieldset>
        </form>
    )
}
