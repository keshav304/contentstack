import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, Chip, Typography, CardHeader, CardContent,
} from '@material-ui/core';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
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
      "val": 0.02,
      "name": "Luxury",
      "id": 1
  },
  {
      "val": 0.03,
      "name": "Decore",
      "id": 2
  },
  {
      "val": 0.23,
      "name": "Furniture",
      "id": 3
  },
  {
      "val": 0.3,
      "name": "Bedroom",
      "id": 4
  },
  {
      "val": 0.23,
      "name": "Kitchen",
      "id": 5
  }
]
const card_tags = [
  {
      "tag_name": "Dining",
      "tag_score": 0.07861635220125789
  },
  {
      "tag_name": "Homeware",
      "tag_score": 0.1415094339622642
  },
  {
      "tag_name": "Lights",
      "tag_score": 0.23584905660377367
  },
  {
      "tag_name": "Beds",
      "tag_score": 0.07232704402515726
  },
  {
      "tag_name": "Gifts",
      "tag_score": 0.009433962264150947
  }
]
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
function SliderSidebar({ isSidebarOpen,
  setIsSidebarOpen,
  personalizationBehaviours,
  setPersonalizationBehaviours,
  tags,
  setTags,
  handleClickBehaviour,
  handleClickTags,
}) {
  const classes = useStyles();

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
        <Card className={classes.cardroot}>
          <CardHeader
            avatar={(
              <GpsFixedIcon className={classes.icon} />
          )}
            title="Targeting Behaviours"
          />
          <CardContent>
            <ul className={classes.tags}>
              {
                behaviours.map(({ name, val }) => {
                  const selected = personalizationBehaviours.indexOf(name) !== -1;

                  return (
                    <li key={name} className={classes.chip}>
                      <Chip
                        variant="default"
                        label={name}
                        icon={<ProgressIcon value={val} />}
                        onClick={() => handleClickBehaviour(name)}
                        clickable
                        color={selected ? 'primary' : undefined}
                      />
                    </li>
                  );
                })
            }
              {behaviours.length === 0 && <Typography variant="caption">No targeting campaign for this page.</Typography>}
            </ul>
          </CardContent>
        </Card>
        <Card className={classes.cardroot}>
          <CardHeader
            avatar={(
              <GpsFixedIcon className={classes.icon} />
          )}
            title="Targeting Tags"
          />
          <CardContent>
            <ul className={classes.tags}>
              {
                card_tags.map(({ tag_name, tag_score }) => {
                  const selectedTags = tags.indexOf(tag_name) !== -1;

                  return (
                    <li key={tag_name} className={classes.chip}>
                      <Chip
                        variant="default"
                        label={tag_name}
                        icon={<ProgressIcon value={tag_score} />}
                        onClick={() => handleClickTags(tag_name)}
                        clickable
                        color={selectedTags ? 'primary' : undefined}
                      />
                    </li>
                  );
                })
            }
              {card_tags.length === 0 && <Typography variant="caption">No targeting campaign for this page.</Typography>}
            </ul>
          </CardContent>
        </Card>
      </Drawer>
    </div>
  );
}
export default SliderSidebar;
