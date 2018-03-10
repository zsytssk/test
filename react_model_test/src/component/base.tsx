import * as React from "react";
import { BaseModel } from "../model/baseModel";

type Props = {
  model: BaseModel;
};
export class BaseComponent<P extends Props, T> extends React.Component<P, T> {
  componentDidMount() {}
}
