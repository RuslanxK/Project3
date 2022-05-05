import { useState } from "react";
import { addItem } from "../utils";

const subscriptionsURL = "http://localhost:8000/api/subscriptions";

function SubscribeToMovie({ member, subscribers, movies }) {
  const [subscription, setSubscription] = useState({ name: "", date: "" });

  const moviesWatched = movies.map((movie, index) => {
    let foundSubscription = subscribers.find(
      (subscriber) =>
        subscriber.movieid === movie._id && subscriber.memberid === member._id
    );

    if (!foundSubscription) {
      return <option key={index}>{movie.name}</option>;
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubscription({ ...subscription, [name]: value });
  };

  const subscribe = async () => {
    let movieid;

    for (let i = 0; i < movies.length; i++) {
      if (movies[i].name === subscription.name) {
        movieid = movies[i]._id;
      }
    }

    if (movieid.length) {
      const obj = {
        movieid: movieid,
        memberid: member._id,
        date: subscription.date,
      };

      const addSub = await addItem(subscriptionsURL, obj);

      console.log(addSub);

      window.location.reload();
    }
  };

  return (
    <div className="subscribeDiv">
      <div class="title is-5">Add A New Movie</div>
      <div
        class="select"
        style={{ fontSize: "13px", width: "140px", margin: "5px" }}
      >
        <select name="name" onChange={handleChange}>
          <option>Select Movie...</option>
          {moviesWatched}
        </select>
      </div>
      <input
        class="input"
        type="date"
        placeholder="Date..."
        name="date"
        style={{ fontSize: "13px", width: "140px", margin: "5px" }}
        onChange={handleChange}
      />{" "}
      <br />
      <button
        class="button is-link"
        style={{ margin: "5px" }}
        onClick={subscribe}
      >
        Subscribe
      </button>
    </div>
  );
}

export default SubscribeToMovie;
