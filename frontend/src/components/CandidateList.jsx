import { useEffect, useState } from "react";
import API from "../api/api";

function CandidateList() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await API.get("/candidates");

      setCandidates(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="candidate-list">
      <h2>All Candidates</h2>

      <div className="candidate-grid">
        {candidates.map((candidate) => (
          <div className="candidate-card" key={candidate._id}>
            <h3>{candidate.name}</h3>

            <p>{candidate.email}</p>

            <p>
              <strong>Experience:</strong> {candidate.experience} years
            </p>

            <div className="skills">
              {candidate.skills.map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </div>

            <p>{candidate.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandidateList;