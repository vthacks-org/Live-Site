import React from "react"
import styles from "./EventListItem.module.css"

import Badge from "react-bootstrap/Badge"

import { EVENT_LIST_ITEM_HEIGHT } from "../constants"
import { EventCategoryColor, RelativeTime } from "../enums"
import Color from "../colors"

import { IEvent } from "../interfaces"
import { formattedEventTime } from "../utils"
import clsx from "clsx"

interface PropTypes {
  event: IEvent
  showAsToday: boolean
  relativeDayTime: RelativeTime
}

const EventListItem: React.FC<PropTypes> = props => {
  return (
    <div
      className={clsx(styles["event-item"], styles[`${props.relativeDayTime}`])}
    >
      <div
        className={styles["event-item-content"]}
        style={{ minHeight: EVENT_LIST_ITEM_HEIGHT }}
      >
        <svg className={styles["category-circle"]} height="12" width="12">
          <circle
            cx="6"
            cy="6"
            r="6"
            fill={EventCategoryColor[props.event.category] || Color.Overflow}
          />
        </svg>
        {props.relativeDayTime === RelativeTime.Present && (
          <svg className={styles["active-circle"]} height="12" width="12">
            <circle cx="6" cy="6" r="6" fill={Color.LiveActivity} />
          </svg>
        )}

        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
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
        <span>{formattedEventTime(props.event)}</span>
      </div>
    </div>
  )
}

export default EventListItem
