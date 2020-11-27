import React from "react"
import "./ScheduleView.css"

import {
  ONE_MINUTE_MILLISECOND,
  SHOW_AS_LIVE_DATES,
  MOBILE_BREAKPOINT_WIDTH,
  ONE_DAY_MILLISECOND,
} from "../constants"
import { EventListener, RelativeTime } from "../enums"
import { IEvent, IEventDay } from "../interfaces"
import { getRelativeDayTime, daysFromSchedule } from "../utils"
import _ from "lodash"

import { Container, Row, Col } from "react-bootstrap"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"

import TimelineComponent from "../components/TimelineComponent"
import EventListComponent from "../components/EventListComponent"

import DiscordComponent from "../components/DiscordComponent"
import TwitterComponent from "../components/TwitterComponent"

type Props = {
  schedule: IEvent[]
}

const ScheduleView: React.FC<Props> = ({ schedule }) => {
  const days = daysFromSchedule(schedule)

  let initialDay = days[0]
  if (getRelativeDayTime(days[1].date) === RelativeTime.Present) {
    initialDay = days[1]
  } else if (getRelativeDayTime(days[2].date) === RelativeTime.Present) {
    initialDay = days[2]
  }

  const [mobile, setMobile] = React.useState(true)
  const [day, setDay] = React.useState(initialDay)
  const [, setDummy] = React.useState()

  const updateDimensions = () => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT_WIDTH
    if (mobile !== isMobile) {
      setMobile(isMobile)
    }
  }

  React.useEffect(() => {
    updateDimensions()
    window.addEventListener(EventListener.Resize, updateDimensions)
    const interval = setInterval(() => {
      setDummy({})
    }, ONE_MINUTE_MILLISECOND)

    return () => {
      window.removeEventListener(EventListener.Resize, updateDimensions)
      clearInterval(interval)
    }
  })

  const hasPassed =
    new Date().getTime() >=
    new Date(days[2].date.getTime() + ONE_DAY_MILLISECOND).getTime()

  const relativeDayTime = hasPassed
    ? RelativeTime.Future
    : getRelativeDayTime(day.date)

  const showAsToday =
    (relativeDayTime === RelativeTime.Present || !SHOW_AS_LIVE_DATES) &&
    !hasPassed
  const devPostImage = require("../assets/brand-logos/devpost-logo.svg")

  const renderTimelineDays = () => {
    const createLabels = () => {
      return _.map(days, (eventDay, index) => {
        const color = index === day.index ? "#f89b6a" : "#3a3a3a"
        return (
          <Button
            key={`btn-group-${index}`}
            onClick={() => setDay(eventDay)}
            className="day-label-btn"
            style={{
              backgroundColor: color,
              borderColor: color,
              fontSize: "1em",
            }}
          >
            {(!mobile && eventDay.longTitle) || eventDay.title}
          </Button>
        )
      })
    }

    return (
      <div className="d-flex flex-column">
        <ButtonGroup>{createLabels()}</ButtonGroup>
      </div>
    )
  }

  return (
    <Container id="schedule" fluid>
      <Col>
        <div>
          {renderTimelineDays()}
          <TimelineComponent
            day={day}
            showAsToday={showAsToday}
            relativeDayTime={relativeDayTime}
          />
          <EventListComponent
            key={day.title}
            day={day}
            showAsToday={showAsToday}
            relativeDayTime={relativeDayTime}
          />
        </div>
        <Row>
          <DiscordComponent
            className="discord-container"
            serverId="769007930585382954"
          />
          <TwitterComponent
            className="twitter-container"
            account="VT_Hacks"
            limit={15}
            theme="light"
            alt=""
          />
        </Row>
        <Row>
          <div className="dev-post">
            <a href="re.com" target="_blank">
              <img className="dev-post" src={devPostImage} />
            </a>
          </div>
        </Row>
      </Col>
    </Container>
  )
}

export default ScheduleView
