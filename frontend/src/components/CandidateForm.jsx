import { useState } from "react";
import API from "../api/api";

function CandidateForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    bio: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const candidateData = {
        ...formData,
        skills: formData.skills.split(","),
      };

      await API.post("/candidates", candidateData);

      alert("Candidate Added Successfully");

      setFormData({
        name: "",
        email: "",
        skills: "",
        experience: "",
        bio: "",
      });
    } catch (error) {
      console.log(error);

      alert("Error adding candidate");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Candidate</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (React, Node.js)"
          value={formData.skills}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        />

        <button type="submit">Add Candidate</button>
      </form>
    </div>
  );
}

export default CandidateForm;