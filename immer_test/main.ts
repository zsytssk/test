import produce from "immer";
import { log } from "./utils";

type StateData = {
  todo: string;
  done?: boolean;
}[];
const baseState: StateData = [
  {
    todo: "Learn typescript",
    done: true
  },
  {
    todo: "Try immer",
    done: false
  }
];

const nextState = produce(baseState, draftState => {
  log(this);
  draftState.push({ todo: "Tweet about it" });
  draftState[1].done = true;
});
