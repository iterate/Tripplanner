import React, { Component } from "react";
import styled from "styled-components";
import Warning from "./../Warning";

const CreateMapDiv = styled.div`
  font-weight: 300;
  background: rgba(255, 255, 255, 0.92);
  padding: 20px;
  display: -ms-flexbox;
  display: flex;
  max-width: 400px;
  flex-direction: column;

  align-items: center;

  margin-bottom: 10px;
  flex-align: center;

  @media (min-width: 768px) {
    align-items: center;
    align-self: flex-end;
    margin-right: 30px;
  }
  @media (min-width: 1024px) {
    width: 500px;
    height: 500px;
    margin-bottom: 30px;
  }
`;
const CreateMapTitle = styled.h3``;

const InputBox = styled.input`
  width: 200px;
  height: 30px;
  font-size: 14px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(202, 202, 202);
  border-image: initial;
  border-radius: 1px;
  margin-left: 10px;
`;
const Button = styled.button`
  background-color: rgb(123, 157, 179);
  color: white;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  padding: 10px 24px;
  text-decoration: none;
  border-radius: 4px;
  margin: 10px 20px;
  width: 60%;
  &:hover {
    background: rgb(151, 183, 204);
  }
`;

const ChangeViewA = styled.a`
  cursor: pointer;
  font-weight: 400;
  color: #7292a7;
`;

class Createmap extends Component {
  state = { existingMap: false };

  isExistingMap() {
    return this.state.existingMap;
  }
  changeView() {
    this.setState({
      existingMap: !this.state.existingMap
    });
  }

  render() {
    return (
      <CreateMapDiv>
        {this.props.warning && (
          <Warning warning={this.props.warning}>
            {this.props.warning.text}
          </Warning>
        )}
        {/* {this.props.mapInUseWarning ? (
          <Warning warningl1="This map already exists" />
        ) : null} */}
        <h3>
          {this.isExistingMap()
            ? "Enter existing map"
            : "Create a map, start planning"}
        </h3>
        <div>
          <span>tripplanner.iterate.no/</span>
          <InputBox
            placeholder="Groupname, tripname or other"
            onChange={this.props.onTextChange}
            onKeyDown={this.props.onTextKeyDown}
          />
        </div>
        {this.isExistingMap() ? (
          <React.Fragment>
            <Button onClick={this.props.onVisitMapClick}>Visit map</Button>
            <ChangeViewA onClick={this.changeView.bind(this)}>
              Create a new map?
            </ChangeViewA>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button onClick={this.props.onCreateRoomClick}>Create map</Button>
            <ChangeViewA onClick={this.changeView.bind(this)}>
              Already have a map?
            </ChangeViewA>
          </React.Fragment>
        )}
      </CreateMapDiv>
    );
  }
}

export default Createmap;
