import React from "react";
import ExpenseList from "./expense-list/ExpenseList";
import ExpenseListFilters from "./expense-list/ExpenseListFilters";

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
