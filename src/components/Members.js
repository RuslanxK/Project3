import { useState, useEffect } from "react";
import Member from "./Member";
import { getAll } from "../utils";
import { useNavigate } from "react-router-dom";

const membersURL = "http://localhost:8000/api/members";

function Members() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: members } = await getAll(membersURL);
      setMembers(members);
    };

    fetchData();
  }, []);

  const memberComp = members.map((member) => {
    return <Member key={member._id} member={member} />;
  });

  return (
    <div>
      <div
        class="title is-2"
        style={{ color: "white", textAlign: "center", "padding-top": "50px" }}
      >
        Members
      </div>

      <div className="btns">
        <button
          className="allMembersBtn"
          onClick={() => navigate("/homepage/members")}
        >
          All Members
        </button>
        <button
          className="addMemberBtn"
          onClick={() => navigate("/homepage/addmember")}
        >
          Add Member
        </button>
      </div>

      <div className="subscriptionsPage">{memberComp}</div>
    </div>
  );
}

export default Members;
