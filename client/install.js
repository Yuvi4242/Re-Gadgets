const { execSync } = require('child_process');
const fs = require('fs');

try {
  console.log("Running npm install inside Node child_process...");
  // Use stdio: pipe to prevent TTY blocks
  const out = execSync('npm.cmd install', { encoding: 'utf-8', stdio: 'pipe' });
  fs.writeFileSync('install_out.log', out);
  console.log("Done successfully.");
} catch (e) {
  fs.writeFileSync('install_err.log', e.toString() + "\n" + (e.stdout ? e.stdout.toString() : '') + "\n" + (e.stderr ? e.stderr.toString() : ''));
  console.log("Errored during execution.");
}
