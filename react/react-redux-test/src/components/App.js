import React from "react";
import Footer from "./Footer";
import AddTodo from "../containers/AddTodo";
import VisibleTodoList from "../containers/VisibleTodoList";

const App = () => {
  console.log(1);
  return (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  );
};

export default App;
