import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import {
  Card, Chip, Typography, CardHeader, CardContent,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import ClearIcon from '@material-ui/icons/Clear';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Slider from "./slider";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '20%',
  },
  drawerPaper: {
    width: '20%',
    padding: theme.spacing(2),
  },
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },

  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  clearicon: {

  },
  icon: {
    fill: `${theme.palette.primary.main}`,
  },

  chip: {
    margin: theme.spacing(0.5),
  },
  cardroot: {
    borderLeft: `6px solid ${theme.palette.primary.main}`,
    width: '100%',
    marginBottom: theme.spacing(),
  },
}));
const behaviours = [
  {
    val: 0.1,
    name: "Luxury",
    id: 1,
  },
  {
    val: 0.14,
    name: "Decore",
    id: 2,
  },
  {
    val: 0.23,
    name: "Furniture",
    id: 3,
  },
  {
    val: 0.3,
    name: "Bedroom",
    id: 4,
  },
  {
    val: 0.23,
    name: "Kitchen",
    id: 5,
  },
];
const card_tags = [
  {
    tag_name: "Dining",
    tag_score: 0.15,
  },
  {
    tag_name: "Homeware",
    tag_score: 0.20,
  },
  {
    tag_name: "Lights",
    tag_score: 0.35,
  },
  {
    tag_name: "Beds",
    tag_score: 0.16,
  },
  {
    tag_name: "Gifts",
    tag_score: 0.14,
  },
];
function ProgressIcon({ value }) {
  return (
    <div
      style={{
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6,
      }}
    >
      {Math.round(value * 100)}
      %
    </div>
  );
}
const CheckboxWithGreenCheck = withStyles({
  root: {
    "& .MuiSvgIcon-root": {
      fill: "white",
      "&:hover": {
        backgroundColor: "white",
      },
    },
    "&$checked": {
      "& .MuiIconButton-label": {
        position: "relative",
        zIndex: 0,
        border: "1px solid #bbbbbb",
        borderRadius: 3,
        width: '82%',
        height: 22,
      },
      "& .MuiIconButton-label:after": {
        content: '""',
        left: 4,
        top: 4,
        height: 13,
        width: 13,
        position: "absolute",
        backgroundColor: "#9978E1",
        zIndex: -1,
        borderColor: "transparent",
      },
    },
    "&:not($checked) .MuiIconButton-label": {
      position: "relative",
      zIndex: 0,
      border: "1px solid #bbbbbb",
      borderRadius: 3,
      width: '82%',
      height: 22,
    },
    "&:not($checked) .MuiIconButton-label:after": {
      content: '""',
      left: 4,
      top: 4,
      height: 15,
      width: 15,
      position: "absolute",
      backgroundColor: "white",
      zIndex: -1,
      borderColor: "transparent",
    },
  },
  checked: {},
})(Checkbox);
function SliderSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  setPersonalizationBehaviours,
  setTags,
}) {
  const classes = useStyles();
  const [bvsProgress, setBvsProgress] = React.useState(0);
  const [tagsProgress, setTagsProgress] = React.useState(0);
  const [state, setState] = React.useState({
    Luxury: false,
    Decore: false,
    Bedroom: false,
    Furniture: false,
    Kitchen: false,
    Dining: false,
    Homeware: false,
    Lights: false,
    Gifts: false,
    Beds: false,
  });

  const handleChange = (type, name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
    if (type === 'behaviours') {
      let bvs = bvsProgress;
      if (name === "Luxury") {
        if (event.target.checked === true) {
          bvs += 10;
        } else {
          bvs -= 10;
        }
      }
      if (name === "Decore") {
        if (event.target.checked === true) {
          bvs += 14;
        } else {
          bvs -= 14;
        }
      }
      if (name === "Bedroom") {
        if (event.target.checked === true) {
          bvs += 30;
        } else {
          bvs -= 30;
        }
      }
      if (name === "Furniture") {
        if (event.target.checked === true) {
          bvs += 23;
        } else {
          bvs -= 23;
        }
      }
      if (name === "Kitchen") {
        if (event.target.checked === true) {
          bvs += 23;
        } else {
          bvs -= 23;
        }
      }
      setBvsProgress(bvs);
    }
    if (type === 'tags') {
      let tags = tagsProgress;
      if (name === "Lights") {
        if (event.target.checked === true) {
          tags += 35;
        } else {
          tags -= 35;
        }
      }
      if (name === "Dining") {
        if (event.target.checked === true) {
          tags += 15;
        } else {
          tags -= 15;
        }
      }
      if (name === "Homeware") {
        if (event.target.checked === true) {
          tags += 20;
        } else {
          tags -= 20;
        }
      }
      if (name === "Beds") {
        if (event.target.checked === true) {
          tags += 16;
        } else {
          tags -= 16;
        }
      }
      if (name === "Gifts") {
        if (event.target.checked === true) {
          tags += 14;
        } else {
          tags -= 14;
        }
      }
      setTagsProgress(tags);
    }
  };

  const handleCancel = (type) => {
    if (type === 'tags') {
      setState({
        ...state,
        Dining: false,
        Homeware: false,
        Lights: false,
        Gifts: false,
        Beds: false,
      });
      setTagsProgress(0);
    }
    if (type === 'behaviour') {
      setState({
        ...state,
        Luxury: false,
        Decore: false,
        Bedroom: false,
        Furniture: false,
        Kitchen: false,
      });
      setBvsProgress(0);
    }
  };

  const handleApply = (type) => {
    const tgs = [];
    const bvs = [];
    if (state.Luxury === true) {
      bvs.push("Luxury");
    }
    if (state.Decore === true) {
      bvs.push("Decore");
    }
    if (state.Bedroom === true) {
      bvs.push("Bedroom");
    }
    if (state.Furniture === true) {
      bvs.push("Furniture");
    }
    if (state.Kitchen === true) {
      bvs.push("Kitchen");
    }
    if (state.Dining === true) {
      tgs.push("Dining");
    }
    if (state.Lights === true) {
      tgs.push("Lights");
    }
    if (state.Beds === true) {
      tgs.push("Beds");
    }
    if (state.Homeware === true) {
      tgs.push("Homeware");
    }
    if (state.Gifts === true) {
      tgs.push("Gifts");
    }
    setPersonalizationBehaviours(bvs);
    setTags(tgs);
    setIsSidebarOpen(false);
  };
  return (
    <div>
      <Drawer
        anchor="left"
        variant="persistent"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <img src="https://i.imgur.com/63vXA73.png" className="sidebar-logo" />

        <div className="sidebarCard">
          <div className="sidebarCardHeading">
            <GpsFixedIcon className={classes.icon} />
            <div className="sidebarCardInfo">
              <p className="sidebarCardInfoHeading">Add Targeting Behaviours</p>
              <p className="sidebarCardInfoSubHeading">Targeting below 80% helps more your audience.</p>
            </div>
          </div>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={bvsProgress} />
            <p className="bvsProgressValue">{bvsProgress}%</p>
          </Box>
          <div>
            <p className="customTarget">Custom Targets</p>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row className="checkboxContainer">
                <div>
                  <FormControlLabel
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Luxury}
                        onChange={handleChange("behaviours", "Luxury")}
                        value="Luxury"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="10% Luxury"
                    labelPlacement="end"
                    className="Luxury"
                  />

                  <FormControlLabel
                    value="Furniture"
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Furniture}
                        onChange={handleChange("behaviours", "Furniture")}
                        value="Furniture"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",

                        }}
                      />
                    )}
                    label="23% Furniture"
                    labelPlacement="end"
                    className="Furniture"
                  />
                  <FormControlLabel
                    value="Bedroom"
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Bedroom}
                        onChange={handleChange("behaviours", "Bedroom")}
                        value="Bedroom"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="30% Bedroom"
                    labelPlacement="end"
                    className="Bedroom"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value="Decore"
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Decore}
                        onChange={handleChange("behaviours", "Decore")}
                        value="Decore"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="14% Decore"
                    labelPlacement="end"
                    className="Decore"
                  />
                  <FormControlLabel
                    value="Kitchen"
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Kitchen}
                        onChange={handleChange("behaviours", "Kitchen")}
                        value="Kitchen"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="23% Kitchen"
                    labelPlacement="end"
                    className="Kitchen"
                  />
                </div>
              </FormGroup>
            </FormControl>
          </div>
          <hr className="hrFirst" />
          <div className="cardTagsSubmitContainer">
            <p>Save Behaviours</p>
            <div className="cardTagsSubmitBtnContainer">
              <button className="cardTagsCancelBtn" onClick={() => handleCancel('behaviour')}>Reset</button>
              <button className="cardTagsApplyBtn" onClick={() => handleApply('behaviour')}>Apply</button>
            </div>
          </div>
          <hr className="hrSecond" />
        </div>
        <div className="secondSidebarCard">
          <div className="sidebarCardHeading">
            <GpsFixedIcon className={classes.icon} />
            <div className="sidebarCardInfo">
              <p className="sidebarCardInfoHeading">Add Targeting Tags</p>
              <p className="sidebarCardInfoSubHeading">Targeting below 80% helps more your audience.</p>
            </div>
          </div>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={tagsProgress} />
            <p className="tagsProgressValue">{tagsProgress}%</p>
          </Box>
          <div>
            <p className="customTarget">Custom Targets</p>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row className="checkboxContainer">
                <div>
                  <FormControlLabel
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Dining}
                        onChange={handleChange("tags", "Dining")}
                        value="Dining"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="15% Dining"
                    labelPlacement="end"
                    className="Luxury"
                  />

                  <FormControlLabel
                    value="Lights"
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Lights}
                        onChange={handleChange("tags", "Lights")}
                        value="Lights"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",

                        }}
                      />
                    )}
                    label="35% Lights"
                    labelPlacement="end"
                    className="Furniture"
                  />
                  <FormControlLabel
                    value="Homeware"
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Homeware}
                        onChange={handleChange("tags", "Homeware")}
                        value="Homeware"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="20% Homeware"
                    labelPlacement="end"
                    className="Bedroom"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value="Beds"
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Beds}
                        onChange={handleChange("tags", "Beds")}
                        value="Beds"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="16% Beds"
                    labelPlacement="end"
                    className="Decore"
                  />
                  <FormControlLabel
                    value="Gifts"
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Gifts}
                        onChange={handleChange("tags", "Gifts")}
                        value="Gifts"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="14% Gifts"
                    labelPlacement="end"
                    className="Kitchen"
                  />
                </div>
              </FormGroup>
            </FormControl>
          </div>
          <hr className="hrThird" />
          <div className="cardTagsSubmitContainer">
            <p>Save Tags</p>
            <div className="cardTagsSubmitBtnContainer">
              <button className="cardTagsCancelBtn" onClick={() => handleCancel('tags')}>Reset</button>
              <button className="cardTagsApplyBtn" onClick={() => handleApply('tags')}>Apply</button>
            </div>
          </div>
          <hr className="hrFourth" />
        </div>
        <button onClick={() => setIsSidebarOpen(false)} className="closedrawer">Close</button>
      </Drawer>
    </div>
  );
}
export default SliderSidebar;