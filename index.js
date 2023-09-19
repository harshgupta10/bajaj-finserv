const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Example user ID format: john_doe_17091999
const generateUserId = (full_name, dob) => {
  const formattedName = full_name.replace(' ', '_').toLowerCase();
  const formattedDob = dob.replace(/-/g, '');
  return `user_id: ${formattedName}_${formattedDob}`;
};

// POST endpoint
app.post('/bfhl', (req, res) => {
  const {
    full_name,
    dob,
    college_email,
    roll_number,
    numbers,
    alphabets
  } = req.body;

  const highestAlphabet = alphabets.sort()[alphabets.length - 1];

  const response = {
    user_id: generateUserId(full_name, dob),
    is_success: true,
    status: 'Success',
    college_email,
    college_roll_number: roll_number,
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet
  };

  res.json(response);
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
