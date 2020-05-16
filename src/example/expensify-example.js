import { createStore, combineReducers } from "redux";
import { v1 as uuid } from "uuid";

// ACTIONS
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});
const sortByDate = () => ({
  type: "SORT_BY_DATE",
});
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT",
});
const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate,
});
const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate,
});

// ExpensesReducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return { ...expense, ...action.updates };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};
// FilterReducer
const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return { ...state, text: action.text };
    case "SORT_BY_DATE":
      return { ...state, sortBy: "date" };
    case "SORT_BY_AMOUNT":
      return { ...state, sortBy: "amount" };
    case "SET_START_DATE":
      return { ...state, startDate: action.startDate };
    case "SET_END_DATE":
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      const startDateMatch =
        typeof startDate !== "number" || expense >= startDate;
      const endDateMatch = typeof endDate !== "number" || expense <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

// Store Creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  const { expenses, filters } = store.getState();
  const visibleExpenses = getVisibleExpenses(expenses, filters);
  console.log(visibleExpenses);
});

const expOne = store.dispatch(
  addExpense({ amount: 2000, description: "Test rent 1", createdAt: 1000 })
);
const expTwo = store.dispatch(
  addExpense({ amount: 3000, description: "Testt 2", createdAt: 2000 })
);
const expThree = store.dispatch(
  addExpense({ amount: 2500, description: "Testtt 2", createdAt: 3000 })
);

store.dispatch(sortByAmount());
