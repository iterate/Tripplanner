import React, { Component } from "react";
import styled from "styled-components";
import ReactGA from "react-ga";
import Warning from "./../Warning";
import Button from "../ButtonComponent";
import InputBox from "../InputComponentStyle";

ReactGA.initialize("UA-122456830-1");

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
  margin-top: 20px;
  flex-align: center;

  @media (min-width: 768px) {
    align-items: center;
  }
  @media (min-width: 1024px) {
    width: 500px;
    height: 500px;
    margin-bottom: 30px;
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

  registerClick = (description) => {
    ReactGA.event({
      category: "Navigation",
      action: description
    });
  };

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
            <Button onClick={ (e) => {
              this.registerClick("Visit map");
              this.props.onVisitMapClick(e);
              }}>Visit map</Button>
            <ChangeViewA onClick={this.changeView.bind(this)}>
              Create a new map?
            </ChangeViewA>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button onClick={ (e) => {
              this.registerClick("Create map");
              this.props.onCreateRoomClick(e);
              }}>Create map</Button>
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
