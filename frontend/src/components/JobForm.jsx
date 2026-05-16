import { useState } from "react";
import API from "../api/api";

function JobForm() {
  const [formData, setFormData] = useState({
    requiredSkills: "",
    minExperience: "",
  });

  const [results, setResults] = useState([]);

  const [aiRecommendation, setAiRecommendation] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShortlist = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        requiredSkills: formData.requiredSkills.split(","),
        minExperience: Number(formData.minExperience),
      };

      const matchResponse = await API.post("/match", payload);

      setResults(matchResponse.data);

      const aiResponse = await API.post("/ai/shortlist", payload);

      setAiRecommendation(aiResponse.data.aiRecommendation);
    } catch (error) {
      console.log(error);

      alert("Error fetching shortlist");
    }
  };

  return (
    <div>
      <div className="form-container">
        <h2>Shortlist Candidates</h2>

        <form onSubmit={handleShortlist}>
          <input
            type="text"
            name="requiredSkills"
            placeholder="Required Skills (React, Node.js)"
            value={formData.requiredSkills}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="minExperience"
            placeholder="Minimum Experience"
            value={formData.minExperience}
            onChange={handleChange}
            required
          />

          <button type="submit">Find Candidates</button>
        </form>
      </div>

      <div className="candidate-list">
        <h2>Matched Candidates</h2>

        <div className="candidate-grid">
          {results.map((candidate) => (
            <div className="candidate-card" key={candidate._id}>
              <h3>{candidate.name}</h3>

              <p>{candidate.email}</p>

              <p>
                <strong>Experience:</strong>{" "}
                {candidate.experience} years
              </p>

              <p>
                <strong>Match Score:</strong>{" "}
                {candidate.matchScore}%
              </p>

              <p>
                <strong>Level:</strong> {candidate.level}
              </p>

              <div className="skills">
                {candidate.matchedSkills.map((skill, index) => (
                  <span key={index}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {aiRecommendation && (
        <div className="ai-box">
          <h2>AI Recommendation</h2>

          <pre>{aiRecommendation}</pre>
        </div>
      )}
    </div>
  );
}

export default JobForm;