import "./App.css"
import { TicketList } from "./components/tickets/TicketList"
import { CustomerList } from "./components/customers/CustomerList"
import { EmployeeList } from "./components/employees/EmployeeList"

export const App = () => {
    return (
        <>
            <CustomerList />
            <EmployeeList />
            {/* <TicketList /> */}
        </>
    )
}
