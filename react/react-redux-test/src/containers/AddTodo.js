import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";

const AddTodo = data => {
  let input;
  const { dispatch } = data;
  console.log(data);
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        <input ref={node => (input = node)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default connect()(AddTodo);
