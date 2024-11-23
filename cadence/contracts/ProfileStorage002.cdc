// ProfileStorage.cdc
access(all) contract ProfileStorage002 {

    // Struct to store user profile data
    access(all) struct Profile {
        access(all) let name: String
        access(all) let tags: [String]
        access(account) var followers: Int
        access(all) let verified: Bool
        access(account) var reputation: Int

        init(name: String, tags: [String], followers: Int, verified: Bool, reputation: Int) {
            self.name = name
            self.tags = tags
            self.followers = followers
            self.verified = verified
            self.reputation = reputation
        }

        // Setter function to increment followers
        access(account) fun addFollower() {
            self.followers = self.followers + 1
        }

        access(account) fun decreseFollower(){
            self.followers = self.followers - 1
        }

        access(account) fun addReputation(incrementAmount: Int){
            self.reputation = self.reputation - incrementAmount
        }
        access(account) fun minusReputation(decrementAmount: Int){
            self.reputation = self.reputation - decrementAmount
        }
    }

    // Mapping of account addresses to their profiles
    access(account) var profiles: {Address: Profile}

    // Constructor
    init() {
        self.profiles = {}
    }

    // Function to create or update a profile
    access(all) fun setProfile(userAddress: Address, name: String, tags: [String]) {
        self.profiles[userAddress] = Profile(name: name, tags: tags, followers: 0, verified: false, reputation: 0)
    }

    // Function to retrieve a user's profile
    access(all) fun getProfile(userAddress: Address): Profile? {
        return self.profiles[userAddress]
    }

    access(all) fun getAllProfiles(): {Address: Profile} {
        return self.profiles
    }

    // Function to add followers to a user's profile
    access(all) fun addFollowers(userAddress: Address) {
        if let profile = self.profiles[userAddress] {
            profile.addFollower()
            self.profiles[userAddress] = profile
        }   
        
        
    }

    // Function to decrease followers from a user's profile
    access(all) fun decreaseFollowers(userAddress: Address) {
        if let profile = self.profiles[userAddress] {
            profile.decreseFollower()
            self.profiles[userAddress] = profile
        }  
    }

    // Function to increase reputation of a user's profile
    access(all) fun increaseReputation(userAddress: Address, points: Int) {
        if let profile = self.profiles[userAddress] {
            profile.addReputation(incrementAmount: points)
            self.profiles[userAddress] = profile
        }  
    }

    // Function to decrease reputation of a user's profile
    access(all) fun decreaseReputation(userAddress: Address, points: Int) {
        if let profile = self.profiles[userAddress] {
            profile.minusReputation(decrementAmount: points)
            self.profiles[userAddress] = profile
        }
    }
}