import { Routes, Route, Outlet } from "react-router-dom"
import { EmployeeNav } from "../components/nav/EmployeeNav"
import { Welcome } from "../components/welcome/Welcome"
import { TicketList } from "../components/tickets/TicketList"
import { CustomerList } from "../components/customers/CustomerList"
import { CustomerDetails } from "../components/customers/CustomerDetails"
import { EmployeeList } from "../components/employees/EmployeeList"
import { EmployeeDetails } from "../components/employees/EmployeeDetails"
import { EmployeeForm } from "../components/forms/EmployeeForm"

export const EmployeeViews = ({ currentUser }) => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <EmployeeNav />
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
