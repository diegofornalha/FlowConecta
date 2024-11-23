import EventStaking from "../EventAndStaking.cdc"

access(all) fun main(eventId: UInt64): EventStaking.Event? {
    return EventStaking.getEvent(eventId: eventId)
}
