import EventStaking from "../EventAndStaking.cdc"

      transaction(name: String, stakeAmount: UFix64) {

        execute {
          EventStaking.createEvent(name: name, stakeAmount: stakeAmount, owner: signer.address)
        }
      }