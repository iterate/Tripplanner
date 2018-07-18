import React from "react";
import styled from "styled-components";
import Button from "./ButtonComponent";
import Database from "../database";

const FeedbackForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const FeedbackArea = styled.textarea`
  height: 100px;
  resize: none;
`;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.value == "") {
      alert("Write something");
    } else {
      alert("Thank you for your feedback :)");
      Database.storeFeedback(this.state.value);
    }
    event.preventDefault();
  }

  render() {
    return (
      <FeedbackForm onSubmit={this.handleSubmit}>
        <FeedbackArea
          onChange={this.handleChange}
          value={this.state.value}
          id="FeedbackTxt"
        />

        <Button type="submit">Submit</Button>
      </FeedbackForm>
    );
  }
}

export default Form;
