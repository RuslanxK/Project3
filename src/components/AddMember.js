import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addItem } from "../utils";

const membersURL = "http://localhost:8000/api/members";

function AddMember() {
  const navigate = useNavigate();

  const [newMember, setNewMember] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const addMember = async () => {
    const addedMember = await addItem(membersURL, newMember);
    console.log(addedMember);

    navigate("/homepage/members");
  };

  return (
    <div className="childDiv">
      <div className="addMember">
        <div
          class="title is-3"
          style={{ textAlign: "center", padding: "15px", color: "white" }}
        >
          Add Member
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
                <button id="addBtn" onClick={addMember}>
                  Add
                </button>
                <button
                  style={{ "margin-left": "5px" }}
                  id="cancelBtn"
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

export default AddMember;
