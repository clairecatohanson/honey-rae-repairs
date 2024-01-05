import { useParams } from "react-router-dom"
import "./Customers.css"
import { useState, useEffect } from "react"
import { getCustomerByUserId } from "../../services/customerService"

export const CustomerDetails = () => {
    const [customer, setCustomer] = useState({})
    const { customerUserId } = useParams()

    useEffect(() => {
        getCustomerByUserId(customerUserId).then((data) => {
            const customerObj = data[0]
            setCustomer(customerObj)
        })
    }, [customerUserId])

    return (
        <section className="customer">
            <header className="customer-header">
                {customer.user?.fullName}
            </header>
            <div>
                <span className="customer-info">Email : </span>
                {customer.user?.email}
            </div>
            <div>
                <span className="customer-info">Address : </span>
                {customer.address}
            </div>
            <div>
                <span className="customer-info">Phone Number : </span>
                {customer.phoneNumber}
            </div>
        </section>
    )
}
