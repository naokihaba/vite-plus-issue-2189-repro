const names = [
  'ACTIONS_ID_TOKEN_REQUEST_URL',
  'ACTIONS_ID_TOKEN_REQUEST_TOKEN',
];

let missing = false;

for (const name of names) {
  const value = process.env[name];
  const isPresent = typeof value === 'string' && value.length > 0;
  console.log(`${name}: ${isPresent ? 'present' : 'missing-or-empty'}`);
  missing ||= !isPresent;
}

if (missing) {
  process.exitCode = 1;
}
