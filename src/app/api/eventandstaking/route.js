import * as fcl from "@onflow/fcl";
import "../../../../cadence/config.js";

export async function getEventById(id) {
    const result = await fcl.query({
      cadence: `
      import EventStaking from 0x573a7a21a4a65fd9
      
  
      access(all) fun main(eventId: UInt64): EventStaking.Event? {
        return EventStaking.getEvent(eventId: eventId)
      }
      `,
      args: (arg, t) => [arg(id, t.UInt64)] // Example eventId
    });
  }
export async function getAllEvents() {
    const result = await fcl.query({
      cadence: `
      import EventStaking from 0x573a7a21a4a65fd9
      
  
      access(all) fun main(): {UInt64: EventStaking.Event} {
        return EventStaking.getAllEvents()
      }
      `
    });
  
  }

  export async function stakeEvent(eventId, userAddress, stakeAmount) {
  
    const transactionId = await fcl.mutate({
      cadence: `
      import EventStaking from 0x573a7a21a4a65fd9
      import FlowToken from 0x7e60df042a9c0868

      transaction(eventId: UInt64, userAddress: Address, amount: UFix64) {

        prepare(signer: auth(Storage) &Account) {

          let vaultRef = signer.storage.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Could not borrow reference to the owner's Vault!")
          EventStaking.participate(eventId: eventId, userAddress: userAddress, amount: amount)

        }
      }
      `,
      args: (arg, t) => [
        arg(eventId, t.UInt64), // Example eventId
        arg(userAddress, t.Address), // Example userAddress
        arg(stakeAmount.toFixed(2), t.UFix64) // Example amount
      ],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999
    });
  
    const result = await fcl.tx(transactionId).onceSealed();
  }
  

export async function createEvent(name, stakeAmount, owner) {


const transactionId = await fcl.mutate({
  cadence: `
  import EventStaking from 0x573a7a21a4a65fd9

  transaction(name: String, stakeAmount: UFix64, owner: Address) {
    prepare(signer: auth(Storage) &Account) {
      let eventId = EventStaking.createEvent(name: name, stakeAmount: stakeAmount, owner: owner)
      log(eventId)
    }
  }
  `,
  args: (arg, t) => [
    arg(name, t.String),
    arg(stakeAmount.toFixed(2), t.UFix64),
    arg(owner, t.Address)
  ],
  proposer: fcl.authz,
  payer: fcl.authz,
  authorizations: [fcl.authz],
  limit: 999
});

const result = await fcl.tx(transactionId).onceSealed();

console.log(result);
}