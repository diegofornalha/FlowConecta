import * as fcl from "@onflow/fcl";
import "../../../../cadence/config.js";

export async function createProfile(userAddress, name, tags) {
  try {
    const transactionId = await fcl.mutate({
      cadence: `
        import ProfileStorage002 from 0x573a7a21a4a65fd9

        transaction(userAddress: Address, name: String, tags: [String]) {
          prepare(signer: auth(Storage) &Account) {
            ProfileStorage002.setProfile(userAddress: userAddress, name: name, tags: tags)
          }
        }
      `,
      args: (arg, t) => [
        arg(userAddress, t.Address),
        arg(name, t.String),
        arg(tags, t.Array(t.String)),
      ],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999,
    });

    const result = await fcl.tx(transactionId).onceSealed();

    console.log("Transaction Result:", result);
    return transactionId;
  } catch (error) {
    console.error("Error setting profile:", error);
  }
}

export async function getProfile(userAddress) {
  try {
    const profile = await fcl.query({
      cadence: `
        import ProfileStorage002 from 0x573a7a21a4a65fd9

        access(all) fun main(userAddress: Address): ProfileStorage002.Profile? {
          return ProfileStorage002.getProfile(userAddress: userAddress)
        }
      `,
      args: (arg, t) => [arg(userAddress, t.Address)],
    });

    console.log("Profile:", profile);
    return profile;
  } catch (error) {
    console.error("Error retrieving profile:", error);
  }
}
export async function getAllProfiles() {
  try {
    const profile = await fcl.query({
      cadence: `
        import ProfileStorage002 from 0x573a7a21a4a65fd9

        access(all) fun main(): {Address: ProfileStorage002.Profile} {
          return ProfileStorage002.getAllProfiles()
        }
      `
    });

    console.log("Profile:", profile);
  } catch (error) {
    console.error("Error retrieving profile:", error);
  }
}


export async function addFollowers(userAddress) {
  try {
    const transactionId = await fcl.mutate({
      cadence: `
        import ProfileStorage002 from 0x573a7a21a4a65fd9

        transaction(userAddress: Address) {
          prepare(signer: auth(Storage) &Account) {
            ProfileStorage002.addFollowers(userAddress: userAddress)
          }
        }
      `,
      args: (arg, t) => [arg(userAddress, t.Address)],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999,
    });

    const result = await fcl.tx(transactionId).onceSealed();
    console.log(result)

    console.log("Transaction ID:", transactionId);
    return transactionId;
  } catch (error) {
    console.error("Error adding followers:", error);
  }
}

