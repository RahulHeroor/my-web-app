const express = require('express');
const app = express();

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, Jenkins CI/CD Pipeline!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Exporting for testing
