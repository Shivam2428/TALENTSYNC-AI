const Candidate = require("../models/Candidate");

const shortlistCandidates = async (req, res) => {
  try {
    const { requiredSkills, minExperience } = req.body;

    const candidates = await Candidate.find();

    const results = candidates.map((candidate) => {
      const matchedSkills = candidate.skills.filter((skill) =>
        requiredSkills.includes(skill)
      );

      const score =
        (matchedSkills.length / requiredSkills.length) * 100;

      let level = "Low Match";

      if (score >= 80) {
        level = "High Match";
      } else if (score >= 50) {
        level = "Medium Match";
      }

      return {
        ...candidate._doc,
        matchedSkills,
        matchScore: score.toFixed(2),
        level,
      };
    });

    const filtered = results.filter(
      (candidate) => candidate.experience >= minExperience
    );

    filtered.sort((a, b) => b.matchScore - a.matchScore);

    res.json(filtered);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  shortlistCandidates,
};