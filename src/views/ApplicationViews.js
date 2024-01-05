import { Routes, Route, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { Welcome } from "../components/welcome/Welcome"
import { TicketList } from "../components/tickets/TicketList"
import { CustomerList } from "../components/customers/CustomerList"
import { CustomerDetails } from "../components/customers/CustomerDetails"
import { EmployeeList } from "../components/employees/EmployeeList"
import { EmployeeDetails } from "../components/employees/EmployeeDetails"
import { useState, useEffect } from "react"
import { EmployeeForm } from "../components/forms/EmployeeForm"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localHoneyUser = localStorage.getItem("honey_user")
        const honeyUserObject = JSON.parse(localHoneyUser)

        setCurrentUser(honeyUserObject)
    }, [])

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<Welcome />} />
                <Route
                    path="tickets"
                    element={<TicketList currentUser={currentUser} />}
                />
                <Route path="customers">
                    <Route index element={<CustomerList />} />
                    <Route
                        path=":customerUserId"
                        element={<CustomerDetails />}
                    />
                </Route>
                <Route path="employees">
                    <Route index element={<EmployeeList />} />
                    <Route
                        path=":employeeUserId"
                        element={<EmployeeDetails />}
                    />
                </Route>
                <Route
                    path="profile"
                    element={<EmployeeForm currentUser={currentUser} />}
                />
            </Route>
        </Routes>
    )
}
