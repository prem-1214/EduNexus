import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
const API_KEY = "YOUR_GOOGLE_API_KEY";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const GoogleCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    function initClient() {
      gapi.client.init({ apiKey: VITE_API_KEY, clientId: VITE_CLIENT_ID, discoveryDocs: DISCOVERY_DOCS, scope: SCOPES })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          setIsSignedIn(authInstance.isSignedIn.get());
          authInstance.isSignedIn.listen(setIsSignedIn);
        })
        .catch(error => console.error("Error loading Google API: ", error));
    }
    gapi.load("client:auth2", initClient);
  }, []);

  const handleSignIn = () => gapi.auth2.getAuthInstance().signIn();
  const handleSignOut = () => gapi.auth2.getAuthInstance().signOut();

  const fetchEvents = () => {
    gapi.client.calendar.events.list({ calendarId: "primary", timeMin: new Date().toISOString(), showDeleted: false, singleEvents: true, orderBy: "startTime" })
      .then(response => setEvents(response.result.items))
      .catch(error => console.error("Error fetching events: ", error));
  };

  const addEvent = () => {
    const event = {
      summary: "New Event",
      start: { dateTime: new Date().toISOString(), timeZone: "UTC" },
      end: { dateTime: new Date(new Date().getTime() + 60 * 60000).toISOString(), timeZone: "UTC" }
    };
    gapi.client.calendar.events.insert({ calendarId: "primary", resource: event })
      .then(() => fetchEvents())
      .catch(error => console.error("Error adding event: ", error));
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold">Google Calendar</h2>
      {isSignedIn ? (
        <div>
          <button onClick={handleSignOut} className="px-4 py-2 bg-red-500 text-white rounded">Sign Out</button>
          <button onClick={fetchEvents} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Fetch Events</button>
          <button onClick={addEvent} className="ml-2 px-4 py-2 bg-green-500 text-white rounded">Add Event</button>
          <ul className="mt-4">
            {events.map(event => (
              <li key={event.id} className="border-b py-2">{event.summary} - {event.start.dateTime}</li>
            ))}
          </ul>
        </div>
      ) : (
        <button onClick={handleSignIn} className="px-4 py-2 bg-blue-500 text-white rounded">Sign In with Google</button>
      )}
    </div>
  );
};

export default GoogleCalendar;
