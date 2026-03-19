const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = process.env.PORT || 10000;

// Simple health check endpoint so Render detects an open port
app.get('/', (req, res) => {
  res.send('OpenClaw Bot is running!');
});

// Start the OpenClaw gateway as a separate process
// Bind to 0.0.0.0 and use the same port
const claw = spawn('openclaw', ['gateway', '--host', '0.0.0.0', '--port', port], {
  stdio: 'inherit',
  env: {
    ...process.env,
    // Pass through any necessary environment variables
  }
});

claw.on('error', (err) => {
  console.error('Failed to start OpenClaw:', err);
  process.exit(1);
});

// Start the Express server
app.listen(port, '0.0.0.0', () => {
  console.log(`Health check server listening on port ${port}`);
  console.log(`OpenClaw gateway should be starting on the same port...`);
});
