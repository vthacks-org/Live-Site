import React from "react"
import "./EventListItem.css"

import Badge from "react-bootstrap/Badge"

import { EVENT_LIST_ITEM_HEIGHT } from "../constants"
import { EventCategoryColor, RelativeTime } from "../enums"
import Color from "../colors"

import { IEvent } from "../interfaces"
import { formattedEventTime } from "../utils"

interface PropTypes {
  event: IEvent
  showAsToday: boolean
  relativeDayTime: RelativeTime
}

const EventListItem: React.FC<PropTypes> = props => {
  return (
    <div className={`event-item ${props.relativeDayTime}`}>
      <div
        className="event-item-content"
        style={{ minHeight: EVENT_LIST_ITEM_HEIGHT }}
      >
        <svg className="category-circle" height="12" width="12">
          <circle
            cx="6"
            cy="6"
            r="6"
            fill={EventCategoryColor[props.event.category] || Color.Overflow}
          />
        </svg>
        {props.relativeDayTime === RelativeTime.Present && (
          <svg className="active-circle" height="12" width="12">
            <circle cx="6" cy="6" r="6" fill={Color.LiveActivity} />
          </svg>
        )}

        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "1.5rem",
              lineHeight: 1.2,
              fontWeight: 500,
              fontFamily: "BNRoute22",
            }}
          >
            {props.event.name}
          </span>
          <Badge
            style={{
              padding: "0.5rem",
              textTransform: "uppercase",
              height: "min-content",
            }}
            variant="primary"
          >
            {props.event.location}
          </Badge>
        </span>
        <p>{formattedEventTime(props.event)}</p>
      </div>
    </div>
  )
}

export default EventListItem
