import EventListItem from "./EventListItem";
import * as React from 'react';
import { IEvent } from "../interfaces";
import { EventCategoryColor, RelativeTime } from "../enums";
import "./PlannedEventsComponent.css";

type Props = {
    schedule: IEvent[]
}

interface NameColorPair {
    name: string;
    color: string;
}

const colorKey: NameColorPair[] = [
    {name: "Workshop", color: EventCategoryColor["workshop"]},
    {name: "Event", color: EventCategoryColor["ux"]},
    {name: "Sponsor", color: EventCategoryColor["sponsor"]},
]

const PlannedEventsComponent: React.FC<Props> = ({ schedule }) => {
    React.useEffect(() => {
        console.log(schedule);
    })
    
    return (
        <>
            <div id="title-row">
                <h1>
                    Planned Events
                </h1>
                <div>
                    {
                        colorKey.map((value: NameColorPair, index: number) =>
                            <span className="color-key-row">
                                {value.name}
                                <svg className="category-circle" height="12" width="12">
                                    <circle
                                        cx={6}
                                        cy={6}
                                        r={6}
                                        fill={value.color}>
                                    </circle>
                                </svg>
                            </span>
                        )
                    }
                </div>
            </div>
            {
                schedule.map((event: IEvent, i: number) => {
                    if (event.display) {
                        return (
                            <EventListItem 
                                event={event} 
                                key={i} 
                                showAsToday={false} 
                                relativeDayTime={RelativeTime.Future} />
                        )
                    }
                    else {
                        return <> </>
                    }
                })
            }
        </>
    )
}

export default PlannedEventsComponent;