export const getCustomerByUserId = (userId) => {
    return fetch(
        `http://localhost:8088/customers?userId=${userId}&_expand=user`
    ).then((res) => res.json())
}

export const updateCustomer = (updatedCustomer) => {
    const putOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCustomer),
    }

    return fetch(
        `http://localhost:8088/customers/${updatedCustomer.id}`,
        putOptions
    )
}
