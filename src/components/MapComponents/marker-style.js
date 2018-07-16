export default `
.station:before {
  content: ' ';
  display: inline-block;
  width: 8px;
  height: 8px;
  background: blue;
  border-radius: 8px;
  margin: 0 8px;
  z-index: -1;
}
.station {
  border-radius: 20px;
  padding: 3px;
  //margin: -12px;
  color: transparent;
  //line-height: 24px;
  //font-size: 13px;
  //white-space: nowrap;
}
.station span {
  display: none;
}
.station:hover {
  background: rgba(0,0,0,0.8);
  color: #fff;
}
.station:hover span {
  display: inline-block;
}
`;
