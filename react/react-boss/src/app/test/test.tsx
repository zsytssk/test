import React from 'react';

type Props = { init?: boolean; name: string };
export class Test extends React.Component<Props, Props> {
  constructor(props: Props) {
    super(props);
    this.state = { ...props };
  }
  state = {} as Props;
  onClick = () => {
    this.setState({ name: 'zsy' });
  };
  static getDerivedStateFromProps(props: Props, prev_state: Props) {
    return {
      ...prev_state,
      ...props
    };
  }
  render() {
    console.log(this.props);
    const { name } = this.state;
    console.log(name);
    return (
      <div key={1212312312} onClick={() => this.onClick()}>
        {name}
      </div>
    );
  }
}
