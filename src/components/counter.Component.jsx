import React, { Component } from "react";

class CounterComponent extends Component {
  state = {
    value: this.props.counter.value,
    imageUrl: "https://picsum.photos/200",
    tag: ["tag1", "tag2", "tag3"]
  };

  //   constructor() {
  //     super();
  //     this.handleIncrement = this.handleIncrement.bind(this);
  //   }

  styles = {
    fontSize: 10
  };

  render() {
    return (
      <div className="py-2">
        {/* <img src={this.state.imageUrl} alt="" /> */}
        {/* <h4>{this.props.id}</h4> */}
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => this.props.onIncrement(this.props.counter)}
        >
          Increment
        </button>
        <button
          style={this.styles}
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger m-2"
        >
          Delete
        </button>
        {/* <ul>
          {this.state.tag.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul> */}
        {/* {this.state.tag.length === 0 && "Please create new tag"} */}

        {/* {this.renderTags()} */}
      </div>
    );
  }

  renderTags() {
    if (this.state.tag.length === 0) return <p>There are no tags</p>;

    return (
      <ul>
        {this.state.tag.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  handleIncrement = () => {
    console.log("Increment Clicked");
    this.setState({ value: this.props.counter.value + 1 });
  };

  //   handleIncrement() {
  //     console.log("Increment Clicked");
  //     this.setprops.counter({ count: this.props.counter.count + 1 });
  //   }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default CounterComponent;
