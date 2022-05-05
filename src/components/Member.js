import { useEffect, useState } from "react";
import { deleteItem, getAll } from "../utils";
import { useNavigate } from "react-router-dom";
import SubscriberWatched from "./SubscriberWatched";

const memberURL = "http://localhost:8000/api/members";
const subscriptionsURL = "http://localhost:8000/api/subscriptions";

function Member({ member }) {
  const [subscriptions, setSubscriptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: subscriptions } = await getAll(subscriptionsURL);
      setSubscriptions(subscriptions);
    };

    fetchData();
  }, []);

  const deleteMember = async () => {
    const deletedMember = await deleteItem(memberURL, member._id);

    console.log(deletedMember.data);

    const foundSubscriptions = subscriptions.filter(
      (subscriber) => subscriber.memberid === member._id
    );

    if (foundSubscriptions) {
      foundSubscriptions.forEach((sub) => {
        const deletedData = deleteItem(subscriptionsURL, sub._id);
        console.log(deletedData.data);
      });
    }

    window.location.reload();
  };

  return (
    <div className="memberDiv">
      <div className="test">
        <div className="title is-5">Name: {member.name}</div>

        <div className="title is-5">Email : {member.email}</div>

        <div className="title is-5">City: {member.city}</div>
      </div>

      <SubscriberWatched member={member} />

      <div style={{ padding: "10px" }}>
        <button
          className="editBtn"
          onClick={() => navigate(`/homepage/editmember/${member._id}`)}
        >
          Edit
        </button>
        <button className="deleteBtn" onClick={deleteMember}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Member;
