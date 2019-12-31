import React from 'react'
import { bool, func, number, object, oneOfType, shape, string } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { IconButton, Typography } from '@material-ui/core'
import { Thumbnail, PlaceListItemHandle } from 'components'
import classNames from 'classnames'
import { appendFileNameSuffix } from 'utils'
import CloseCircleIcon from 'mdi-react/CloseCircleIcon'
import { Link } from 'react-router-dom'
import { SortableElement } from 'react-sortable-hoc'

const styles = theme => ({
  root: {
    cursor: 'pointer',
    position: 'relative',
    margin: 10,
    width: 100,
    display: 'inline-flex',
    flexDirection: 'column',
    '@media only screen and (max-width: 325px)': {
      margin: 5,
    },
    [theme.breakpoints.up('md')]: {
      width: 150,
    }
  },

  picture: {
    borderRadius: 20,
    width: 100,
    height: 100,
    [theme.breakpoints.up('md')]: {
      height: 150,
      width: 150,
      borderRadius: 25,
    }
  },

  title: {
    fontSize: 13,
    [theme.breakpoints.up('md')]: {
      fontSize: 16,
    }
  },

  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 5,
  },

  secondaryButton: {
    color: 'rgba(0,0,0,0.54)'
  },

  subtitle: {
    fontSize: 13,
    [theme.breakpoints.up('md')]: {
      fontSize: 14,
    }
  },

  inline: {
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inlinePicture: {
    borderRadius: 20,
    width: 80,
    height: 80,
  },

  inlineContainer: {
    paddingTop: 0,
    paddingLeft: 15,
  },

  deleteIconButton: {
    padding: 5,
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 10,
  },

  deleteIcon: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 100,
  },

  moveIconButton: {
    padding: 5,
    position: 'absolute',
    top: -5,
    right: 17,
    zIndex: 10,
  },

  moveIcon: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 100,
    width: 15,
    height: 15,
  }
})

const PlaceListItem = ({ classes, place, inline, onDelete }) => {
  const rootStyle = classNames({ [classes.root]: true, [classes.inline]: inline })
  const pictureStyle = classNames({ [classes.picture]: true, [classes.inlinePicture]: inline })
  const containerStyle = classNames({ [classes.container]: true, [classes.inlineContainer]: inline })

  return (
    <div className={rootStyle}>
      <IconButton
        color="secondary"
        className={classes.deleteIconButton}
        onClick={() => onDelete(place)}
      >
        <CloseCircleIcon className={classes.deleteIcon} />
      </IconButton>
      <IconButton color="secondary" className={classes.moveIconButton}>
        <PlaceListItemHandle className={classes.moveIcon} />
      </IconButton>
      <Link to={`/home/places/${place.id}`}>
        <Thumbnail src={appendFileNameSuffix(place?.picture_url, '-thumbnail')} className={pictureStyle} />
        <div className={containerStyle}>
          <Typography className={classes.title}>{place?.title}</Typography>
          <Typography className={classes.subtitle} color="textSecondary">{place?.price}</Typography>
          {inline && <Typography className={classes.subtitle} color="textSecondary">
            {place?.contacts?.directions}
          </Typography>
          }
        </div>
      </Link>
    </div>
  )
}

PlaceListItem.propTypes = {
  classes: object.isRequired,
  place: shape({
    id: oneOfType([string, number]).isRequired,
    title: string.isRequired,
    picture_url: string,
    contacts: shape({
      directions: string,
    })
  }).isRequired,
  inline: bool,
  onDelete: func,
}

PlaceListItem.defaultProps = {
  onDelete: () => {},
}

export default withStyles(styles)(SortableElement(PlaceListItem))
