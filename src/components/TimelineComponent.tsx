import React from "react"
import "./TimelineComponent.css"

import { PropTypesDay, IEvent, ICategoryEventList } from "../interfaces"
import { EventCategoryColor } from "../enums"
import {
  identity,
  getRelativeEventTime,
  dateToMinutesInDay,
  formattedEventTime,
  calculateTimelineRows,
} from "../utils"
import Color from "../colors"

import ModalDialog from "../components/ModalDialog"
import { DUMMY_EVENT, TIMEZONE_ABBR } from "../constants"
import _ from "lodash"

const minutes = 60
const timeLabelOffset = 4
const timeMarkerOffset = 1
const labelSpaceVertical = 6
const labelSpaceHorizontal = 90
const trackSpace = 40
const trackStartHeight = 36
const timeLabels = Array.from(Array(24).keys()).map(
  i =>
    `${i % 12 === 0 ? 12 : i % 12}${i % 24 < 12 ? "AM" : "PM"} ${TIMEZONE_ABBR}`
)

function processCategoryBuckets(events: IEvent[]) {
  return events.reduce((collect, event) => {
    collect[event.category] =
      event.category in collect
        ? collect[event.category].concat(event)
        : [event]
    return collect
  }, identity<ICategoryEventList>({}))
}

class TimelineComponent extends React.Component<PropTypesDay> {
  scrollContainerRef: React.RefObject<HTMLDivElement>
  state: {
    modalShow: boolean
    modalFormattedTime: string
    selectedEvent: IEvent
  }

  constructor(props: PropTypesDay) {
    super(props)
    this.scrollContainerRef = React.createRef()

    this.state = {
      modalShow: false,
      modalFormattedTime: "",
      selectedEvent: DUMMY_EVENT,
    }
  }

  componentDidMount() {
    if (this.props.day.events.length) {
      if (this.scrollContainerRef.current) {
        if (this.props.showAsToday) {
          this.scrollContainerRef.current.scrollLeft =
            this.computeSliderPos() - labelSpaceHorizontal
        } else {
          this.scrollContainerRef.current.scrollLeft =
            labelSpaceHorizontal * this.props.day.events[0].start.getHours()
        }
      }
    }
  }

  computeSliderPos() {
    const now = new Date()
    return labelSpaceHorizontal * (now.getHours() + now.getMinutes() / minutes)
  }

  handleEventListItemClick(event: IEvent) {
    this.setState({
      modalShow: true,
      modalFormattedTime: formattedEventTime(event),
      selectedEvent: event,
    })
  }

  renderTimelineTracks() {
    const categoryBuckets = processCategoryBuckets(this.props.day.events)

    const renderCategoryBuckets = () => {
      const buckets: IEvent[][][] = Object.keys(categoryBuckets).map(k => {
        return calculateTimelineRows(categoryBuckets[k])
      })

      let totalIndex = 0

      return _.map(buckets, (bucket: IEvent[][], bucketIndex) => {
        return _.map(bucket, (row: IEvent[], rowIndex) => {
          totalIndex++
          return _.map(row, ele => {
            return (
              <div
                key={`timeline-track-${ele.category}-${ele.name}`}
                className={`timeline-track-item ${
                  this.props.showAsToday
                    ? getRelativeEventTime(ele)
                    : this.props.relativeDayTime
                }`}
                style={{
                  width: (labelSpaceHorizontal / minutes) * ele.duration,
                  left:
                    (labelSpaceHorizontal / minutes) *
                    dateToMinutesInDay(ele.start),
                  top: (trackStartHeight + trackSpace) * (totalIndex / 2),
                }}
                onClick={() => this.handleEventListItemClick(ele)}
              >
                <p>{ele.name}</p>
                <div
                  key={`timeline-track-${ele.category}-${ele.name}`}
                  className="timeline-track-line"
                  style={{
                    background:
                      EventCategoryColor[ele.category] || Color.Overflow,
                  }}
                >
                  {["left", "right"].map(lineEnd => (
                    <svg
                      key={`timeline-line-${lineEnd}`}
                      className={`timeline-track-line-end-${lineEnd}`}
                      height="10"
                      width="10"
                    >
                      <circle
                        className={`timeline-track-line-end-${lineEnd}`}
                        cx="5"
                        cy="5"
                        r="5"
                        fill={
                          EventCategoryColor[ele.category] || Color.Overflow
                        }
                      />
                    </svg>
                  ))}
                </div>
              </div>
            )
          })
        })
      })
    }

    return <div id="timeline-tracks-container">{renderCategoryBuckets()}</div>
  }

  renderSlider() {
    if (!this.props.showAsToday) {
      return null
    }
    return (
      <div
        id="timeline-slider"
        style={{
          left: this.computeSliderPos(),
        }}
      >
        <svg
          className="triangle-pointer top"
          fill="#ff7f7f"
          viewBox="0 0 100 100"
        >
          <path d="M0 0 L50 100 L100 0 Z"></path>
        </svg>
        <svg
          className="triangle-pointer bottom"
          fill="#ff7f7f"
          viewBox="0 0 100 100"
        >
          <path d="M0 100 L50 2 L100 100 Z"></path>
        </svg>
      </div>
    )
  }

  renderTimeline() {
    return (
      <div id="timeline-label-container">
        {timeLabels.map((label, index) => (
          <div key={`timeline-label-${index}`}>
            <p
              className="timeline-label"
              style={{
                top: labelSpaceVertical,
                left: index * labelSpaceHorizontal + timeLabelOffset,
                width: labelSpaceHorizontal,
              }}
            >
              {label}
            </p>
            <div
              className="timeline-label-marker"
              style={{
                left: index * labelSpaceHorizontal - timeMarkerOffset,
              }}
            />
          </div>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div id="timeline" ref={this.scrollContainerRef}>
        <ModalDialog
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          formattedTime={this.state.modalFormattedTime}
          event={this.state.selectedEvent}
        />
        {this.renderTimeline()}
        {this.renderSlider()}
        {this.renderTimelineTracks()}
      </div>
    )
  }
}

export default TimelineComponent
