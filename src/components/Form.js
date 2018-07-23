import React from "react";
import styled from "styled-components";
import Button from "./ButtonComponent";
import InputField from "./InputComponentStyle";
import Database from "../database";

const FeedbackForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5px;
  align-items: center;
  width: 80%;
  margin: auto;
`;
const FeedbackArea = styled.textarea`
  height: 50px;
  resize: none;
  padding: 5px;
  border: 1px solid #cacaca;
  width: 100%;
  margin: 5px 0px;
  font-size: 14px;
  border-radius: 5px;
`;

const EmailStyledInput = styled(InputField)`
  width: 100%;
  padding: 0px;
  margin: 5px 0px;
  padding: 5px;
  font-size: 14px;
  border-radius: 5px;
`;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleAreaChange = this.handleAreaChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAreaChange(event) {
    this.setState({ feedbackValue: event.target.value });
  }
  handleInputChange(event) {
    this.setState({ emailValue: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.feedbackValue === "") {
      alert("Feedback field is empty.");
    } else {
      let email = this.state.emailValue || "--no email--";
      let roomId = this.props.roomId || "--no room--";
      Database.storeFeedback(roomId, this.state.feedbackValue, email);
      alert("Thank you for your feedback :)");
    }
    event.preventDefault();
  }

  render() {
    return (
      <FeedbackForm onSubmit={this.handleSubmit}>
        <FeedbackArea
          onChange={this.handleAreaChange}
          placeholder="Feedback"
          value={this.state.feedbackValue}
          id="FeedbackTxt"
        />
        <EmailStyledInput
          onChange={this.handleInputChange}
          value={this.state.emailValue}
          id="emailTxt"
          placeholder="Email (optional)"
        />

        <Button type="submit">Submit</Button>
      </FeedbackForm>
    );
  }
}

export default Form;
