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
    tag_score: 0.25,
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
  const [progress, setProgress] = React.useState(50);
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
    Beds: false
  });
  

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleCancel=(type)=>{
    console.log('cancel')
    if (type==='tags') {
      setState({ ...state,     
        "Dining": false,
        "Homeware": false,
        "Lights": false,
        "Gifts": false,
        "Beds": false });
    }
    if (type==='behaviour') {
      setState({ ...state,     
        "Luxury": false,
        "Decore": false,
        "Bedroom": false,
        "Furniture": false,
        "Kitchen": false});
    }
  }
  
  const handleApply=(type)=>{
    if (type==='behaviour') {
      const bvs=[]
      if (state["Luxury"]===true) {
        bvs.push("Luxury")
      }
      if (state["Decore"]===true) {
        bvs.push("Decore")
      }
      if (state["Bedroom"]===true) {
        bvs.push("Bedroom")
      }
      if (state["Furniture"]===true) {
        bvs.push("Furniture")
      }
      if (state["Kitchen"]===true) {
        bvs.push("Kitchen")
      }
      console.log({bvs})
      setPersonalizationBehaviours(bvs)
    }
    if (type==='tags') {
      const tgs=[]
      if (state["Dining"]===true) {
        tgs.push("Dining")
      }
      if (state["Lights"]===true) {
        tgs.push("Lights")
      }
      if (state["Beds"]===true) {
        tgs.push("Beds")
      }
      if (state["Homeware"]===true) {
        tgs.push("Homeware")
      }
      if (state["Gifts"]===true) {
        tgs.push("Gifts")
      }
      console.log({tgs})
      setPersonalizationBehaviours(tgs)
    }
  }
  return (
    <div>
      <Drawer
        anchor="left"
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
            <ClearIcon className={classes.clearicon} />
          </div>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} />
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
                        onChange={handleChange("Luxury")}
                        value="Luxury"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="Luxury"
                    labelPlacement="end"
                    className="Luxury"
                  />

                  <FormControlLabel
                    value="Furniture"
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Furniture}
                        onChange={handleChange("Furniture")}
                        value="Furniture"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",

                        }}
                      />
                    )}
                    label="Furniture"
                    labelPlacement="end"
                    className="Furniture"
                  />
                  <FormControlLabel
                    value="Bedroom"
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Bedroom}
                        onChange={handleChange("Bedroom")}
                        value="Bedroom"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="Bedroom"
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
                        onChange={handleChange("Decore")}
                        value="Decore"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="Decore"
                    labelPlacement="end"
                    className="Decore"
                  />
                  <FormControlLabel
                    value="Kitchen"
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Kitchen}
                        onChange={handleChange("Kitchen")}
                        value="Kitchen"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="Kitchen"
                    labelPlacement="end"
                    className="Kitchen"
                  />
                </div>
              </FormGroup>
            </FormControl>
          </div>
          <hr className="hrFirst" />
          <div className="cardTagsSubmitContainer">
            <p>Save Tags</p>
            <div className="cardTagsSubmitBtnContainer">
              <button className="cardTagsCancelBtn" onClick={()=>handleCancel('behaviour')}>Cancel</button>
              <button className="cardTagsApplyBtn" onClick={()=>handleApply('behaviour')}>Apply</button>
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
            <ClearIcon className={classes.clearicon} />
          </div>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} />
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
                        onChange={handleChange("Dining")}
                        value="Dining"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="Dining"
                    labelPlacement="end"
                    className="Luxury"
                  />

                  <FormControlLabel
                    value="Lights"
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Lights}
                        onChange={handleChange("Lights")}
                        value="Lights"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",

                        }}
                      />
                    )}
                    label="Lights"
                    labelPlacement="end"
                    className="Furniture"
                  />
                  <FormControlLabel
                    value="Homeware"
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Homeware}
                        onChange={handleChange("Homeware")}
                        value="Homeware"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="Homeware"
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
                        onChange={handleChange("Beds")}
                        value="Beds"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="Beds"
                    labelPlacement="end"
                    className="Decore"
                  />
                  <FormControlLabel
                    value="Gifts"
                    control={(
                      <CheckboxWithGreenCheck
                        checked={state.Gifts}
                        onChange={handleChange("Gifts")}
                        value="Gifts"
                        style={{
                          transform: "scale(0.8)",
                          paddingRight: "4px",
                        }}
                      />
                    )}
                    label="Gifts"
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
            <button className="cardTagsCancelBtn" onClick={()=>handleCancel('tags')}>Cancel</button>
              <button className="cardTagsApplyBtn" onClick={()=>handleApply('tags')}>Apply</button>
            </div>
          </div>
          <hr className="hrFourth" />
        </div>

      </Drawer>
    </div>
  );
}
export default SliderSidebar;
