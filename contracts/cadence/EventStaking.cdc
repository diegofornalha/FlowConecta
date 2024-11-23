// EventStaking.cdc
access(all) contract EventStaking {

    // Struct to store event data
    access(all) struct Event {
        access(all) let id: UInt64
        access(all) let name: String
        access(all) let stakeAmount: UFix64
        access(all) let owner: Address
        access(all) var participants: [Address]

        init(id: UInt64, name: String, stakeAmount: UFix64, owner: Address) {
            self.id = id
            self.name = name
            self.stakeAmount = stakeAmount
            self.owner = owner
            self.participants = []
        }
    }

    // Mapping of event IDs to events
    access(account) var events: {UInt64: Event}
    access(account) var nextEventID: UInt64

    init() {
        self.events = {}
        self.nextEventID = 1

        // Create a single event during initialization
        let initialEvent = Event(
            id: self.nextEventID,
            name: "Initial Event",
            stakeAmount: 10.0,
            owner: 0x01
        )
        self.events[self.nextEventID] = initialEvent
        self.nextEventID = self.nextEventID + 1
    }

    // Function to create a new event
    access(all) fun createEvent(name: String, stakeAmount: UFix64, owner: Address): UInt64 {
        let eventId = self.nextEventID
        self.events[eventId] = Event(id: eventId, name: name, stakeAmount: stakeAmount, owner: owner)
        self.nextEventID = eventId + 1
        return eventId
    }

    // Function for a user to stake and participate in an event
    access(all) fun participate(eventId: UInt64, userAddress: Address, amount: UFix64) {
        pre {
            amount >= self.events[eventId]!.stakeAmount: "Stake amount is insufficient"
        }
        let eventData = self.events[eventId]!
        eventData.participants.append(userAddress)
    }

    // Function to get event details
    access(all) fun getEvent(eventId: UInt64): Event? {
        return self.events[eventId]
    }

    // Function to distribute the staked amount back to the users
    access(all) fun distribute(eventId: UInt64, caller: Address) {
        pre {
            caller == self.events[eventId]!.owner: "Only the owner can distribute the staked amount"
        }
        let eventData = self.events[eventId]!
        let stakeAmount = eventData.stakeAmount
        for participant in eventData.participants {
            // Logic to transfer the stakeAmount back to the participant
            // This is a placeholder and should be replaced with actual transfer logic
            // Example: transfer(stakeAmount, participant)
        }
        // Remove the event after distribution
        self.events.remove(key: eventId)
    }
}
