import CandidateForm from "../components/CandidateForm";
import CandidateList from "../components/CandidateList";

function Candidates() {
  return (
    <div className="page">
      <CandidateForm />

      <CandidateList />
    </div>
  );
}

export default Candidates;