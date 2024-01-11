import { useState, useEffect } from "react"
import {
    getCustomerByUserId,
    updateCustomer,
} from "../../services/customerService"
import { useNavigate } from "react-router-dom"

export const CustomerForm = ({ currentUser }) => {
    const navigate = useNavigate()

    const [currentCustomer, setCurrentCustomer] = useState({})

    useEffect(() => {
        currentUser.id &&
            getCustomerByUserId(currentUser.id).then((customerArray) => {
                const customerObj = customerArray[0]
                setCurrentCustomer(customerObj)
            })
    }, [currentUser])

    const handleInputChange = (event) => {
        const stateCopy = { ...currentCustomer }
        stateCopy[event.target.name] = event.target.value
        setCurrentCustomer(stateCopy)
    }

    const handleSave = (event) => {
        event.preventDefault()

        if (currentCustomer.address && currentCustomer.phoneNumber) {
            const customerObj = {
                id: currentCustomer.id,
                address: currentCustomer.address,
                phoneNumber: currentCustomer.phoneNumber,
                userId: currentCustomer.userId,
            }

            updateCustomer(customerObj).then(() => {
                navigate("/tickets")
            })
        } else {
            window.alert("Please fill out the address and phone number")
        }
    }

    return (
        <form className="profile">
            <h2>Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address-input">Address</label>
                    <input
                        type="text"
                        id="address-input"
                        className="form-control"
                        name="address"
                        required
                        value={
                            currentCustomer.address
                                ? currentCustomer.address
                                : ""
                        }
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phone-input">Phone Number</label>
                    <input
                        type="text"
                        id="phone-input"
                        className="form-control"
                        name="phoneNumber"
                        required
                        value={
                            currentCustomer.phoneNumber
                                ? currentCustomer.phoneNumber
                                : ""
                        }
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
