const Candidate = require("../models/Candidate");

const getAIShortlist = require("../services/openrouterService");

const aiShortlist = async (req, res) => {
  try {
    const { requiredSkills, minExperience } = req.body;

    const candidates = await Candidate.find();

    const candidateData = candidates
      .map(
        (candidate, index) =>
          `${index + 1}. ${candidate.name} - ${candidate.skills.join(
            ", "
          )} - ${candidate.experience} years`
      )
      .join("\n");

    const prompt = `
Job Requirements:
Skills: ${requiredSkills.join(", ")}
Minimum Experience: ${minExperience} years

Candidates:
${candidateData}

Rank the candidates and explain why they are suitable.
`;

    const aiResponse = await getAIShortlist(prompt);

    res.json({
      aiRecommendation: aiResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  aiShortlist,
};