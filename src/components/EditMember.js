import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById, updateItem } from "../utils";

const membersURL = "http://localhost:8000/api/members";

function EditMember() {
  const [member, setMember] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: member } = await getById(membersURL, id);
      setMember(member);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const updateMember = async () => {
    const updatedMember = await updateItem(membersURL, id, member);

    console.log(updatedMember.data);

    navigate("/homepage/members");
  };

  return (
    <div className="childDiv">

      <div className="editMember">
        <div
          class="title is-3"
          style={{ textAlign: "center", padding: "15px", color: "white" }}
        >
          Edit Member
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  class="input"
                  type="text"
                  name="name"
                  required
                  value={member.name}
                  onChange={handleChange}
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Email</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  class="input"
                  type="text"
                  name="email"
                  required
                  value={member.email}
                  onChange={handleChange}
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">City</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="city"
                  required
                  value={member.city}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label"></div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button id='addBtn' onClick={updateMember}>
                  Update
                </button>
                <button
                
                  style={{ "margin-left": "5px" }} id='cancelBtn'
                  onClick={() => navigate("/homepage/members")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMember;
