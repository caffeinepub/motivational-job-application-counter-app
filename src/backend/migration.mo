import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

module {
  public type UserProfile = {
    name : Text;
  };

  public type ReminderSettings = {
    dailyReminderTime : ?Text;
  };

  public type ApplicationLogEntry = {
    timestamp : Time.Time;
    company : Text;
    role : Text;
    notes : ?Text;
  };

  public type OldActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    appLogs : Map.Map<Principal, List.List<ApplicationLogEntry>>;
  };

  public type NewActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    appLogs : Map.Map<Principal, List.List<ApplicationLogEntry>>;
    reminderPref : Map.Map<Principal, ReminderSettings>;
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      reminderPref = Map.empty<Principal, ReminderSettings>()
    };
  };
};
