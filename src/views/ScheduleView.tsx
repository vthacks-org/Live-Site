import React from "react"
import "./ScheduleView.css"

import {
  ONE_MINUTE_MILLISECOND,
  SHOW_AS_LIVE_DATES,
  MOBILE_BREAKPOINT_WIDTH,
} from "../constants"
import { EventListener, RelativeTime } from "../enums"
import { IEventDay } from "../interfaces"
import {
  firstDay,
  secondDay,
  thirdDay,
  dayAfterLastDay,
} from "../data/schedule"
import { getRelativeDayTime } from "../utils"

import { Container, Row, Col } from "react-bootstrap"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"

import TimelineComponent from "../components/TimelineComponent"
import EventListComponent from "../components/EventListComponent"

import DiscordComponent from "../components/DiscordComponent"
import TwitterComponent from "../components/TwitterComponent"

const days: [IEventDay, IEventDay, IEventDay] = [firstDay, secondDay, thirdDay]
days.forEach(day =>
  day.events.forEach(event => (event.duration = Math.abs(event.duration)))
)

const ScheduleView: React.FC = () => {
  let initialDay = firstDay
  if (getRelativeDayTime(secondDay.date) === RelativeTime.Present) {
    initialDay = secondDay
  } else if (getRelativeDayTime(thirdDay.date) === RelativeTime.Present) {
    initialDay = thirdDay
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

  const hasPassed = new Date().getTime() >= dayAfterLastDay.getTime()
  const relativeDayTime = hasPassed
    ? RelativeTime.Future
    : getRelativeDayTime(day.date)
  const showAsToday =
    (relativeDayTime === RelativeTime.Present || !SHOW_AS_LIVE_DATES) &&
    !hasPassed
  const devPostImage = require("../assets/brand-logos/devpost-logo.svg")

  return (
    <Container id="schedule" fluid>
      <Col>
        <div>
          <div className="d-flex flex-column">
            <ButtonGroup>
              {days.map((dayInfo, index) => (
                <Button
                  key={`btn-group-${index}`}
                  onClick={() => setDay(dayInfo)}
                  variant={index === day.index ? "dark" : "light"}
                >
                  {(!mobile && dayInfo.longTitle) || dayInfo.title}
                </Button>
              ))}
            </ButtonGroup>
          </div>
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
