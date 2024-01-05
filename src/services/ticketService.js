export const getAllTickets = () => {
    return fetch(
        "http://localhost:8088/serviceTickets?_embed=employeeTickets"
    ).then((response) => response.json())
}

export const assignTicket = (newEmployeeTicket) => {
    const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployeeTicket),
    }

    return fetch("http://localhost:8088/employeeTickets", postOptions)
}

export const completeTicket = (updatedServiceTicket) => {
    const putOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedServiceTicket),
    }

    return fetch(
        `http://localhost:8088/serviceTickets/${updatedServiceTicket.id}`,
        putOptions
    )
}
