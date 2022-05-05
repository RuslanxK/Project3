import React from "react";
import { Link } from "react-router-dom";

function AllSubscribersWatched({ subscribers, movie, members }) {
  const subscribedMembers = subscribers.map((subscriber) => {
    let foundSubscriber = members.find(
      (member) => member._id === subscriber.memberid
    );

    if (subscriber.movieid === movie._id && foundSubscriber) {
      return (
        <li key={subscriber._id}>
          <Link to={"/homepage/members"}>{foundSubscriber.name}</Link> -{" "}
          {subscriber.date}
        </li>
      );
    }
  });

  return (
    <div className="subsWatched">
      <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
        Subscribers Watched
      </div>

      {subscribedMembers}
    </div>
  );
}

export default AllSubscribersWatched;
