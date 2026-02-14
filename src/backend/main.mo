import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public type ApplicationLogEntry = {
    timestamp : Time.Time;
    company : Text;
    role : Text;
    notes : ?Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let appLogs = Map.empty<Principal, List.List<ApplicationLogEntry>>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func logApplicationEntry(company : Text, role : Text, notes : ?Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can log entries");
    };

    let newEntry : ApplicationLogEntry = {
      timestamp = Time.now();
      company;
      role;
      notes;
    };

    switch (appLogs.get(caller)) {
      case (null) {
        let entries = List.empty<ApplicationLogEntry>();
        entries.add(newEntry);
        appLogs.add(caller, entries);
      };
      case (?entries) {
        entries.add(newEntry);
      };
    };
  };

  public query ({ caller }) func getRecentApplicationEntries() : async [ApplicationLogEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view entries");
    };

    switch (appLogs.get(caller)) {
      case (null) { [] };
      case (?entries) { entries.toArray() };
    };
  };
};
