import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import getVisibleExpenses from "./selectors/expenses";
import { addExpense, removeExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";

const store = configureStore();

store.subscribe(() => {
  const { expenses, filters } = store.getState();
  const visibleExpenses = getVisibleExpenses(expenses, filters);
  console.log(store.getState());
});

store.dispatch(
  addExpense({ amount: 2000, description: "This rent", createdAt: 3000 })
);
store.dispatch(
  addExpense({ amount: 3500, description: "This exp", createdAt: 4000 })
);
const item = store.dispatch(
  addExpense({ amount: 3000, description: "That shop", createdAt: 5000 })
);
//store.dispatch(setTextFilter("Th"));
//store.dispatch(removeExpense(item.id));

const root = (
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(root, document.getElementById("root"));
