import React, { Component } from "react";
import styled from "styled-components";
import ReactGA from "react-ga";
import Warning from "./../Warning";
import Button from "../ButtonComponent";
import InputBox from "../InputComponentStyle";

ReactGA.initialize("UA-122456830-1");

const CreateMapDiv = styled.div`
  font-weight: 300;
  background: #ffffff;
  padding: 20px;
  display: -ms-flexbox;
  display: flex;
  max-width: 400px;
  flex-direction: column;

  align-items: center;

  margin-bottom: 10px;
  margin-top: 20px;
  border-radius: 4px;
flex-align: center;

  box-shadow: -3px 3px 8px rgba(0, 0, 0, 0.2);

  color: #5B5858;
  @media (min-width: 768px) {
    align-items: center;
  }
  @media (min-width: 1024px) {
    width: 500px;
    height: 200px;
    margin-bottom: 30px;
  }
`;

const BoxTitle = styled.h3`
  font-family: Roboto;
  font-weight: 400;
  margin-top: 0.5em;
`;

const BoxInput = styled.div`
  margin-top: 0.8em;
  margin-bottom: 0.6em;
`;

const ChangeViewADescription = styled.span`
  font-family: Roboto;
  font-size: 16;
  color: black;
`;

const ChangeViewA = styled.span`
  cursor: pointer;
  font-weight: 700;
  font-size: 18;
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
        <BoxTitle>
          {this.isExistingMap()
            ? "Enter existing map"
            : "Create a map, start planning"}
        </BoxTitle>
        <BoxInput>
          <span>tripplanner.iterate.no/</span>
          <InputBox
            placeholder="Groupname, tripname or other"
            onChange={this.props.onTextChange}
            onKeyDown={this.props.onTextKeyDown}
          />
        </BoxInput>
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
            <div>
              Already have a map?{' '}
              <ChangeViewA onClick={this.changeView.bind(this)}>
                Visit existing map
              </ChangeViewA>
            </div>
          </React.Fragment>
        )}
      </CreateMapDiv>
    );
  }
}

export default Createmap;
