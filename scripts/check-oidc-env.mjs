const names = [
  'ACTIONS_ID_TOKEN_REQUEST_URL',
  'ACTIONS_ID_TOKEN_REQUEST_TOKEN',
];

let missing = false;

for (const name of names) {
  const value = process.env[name];
  console.log(`${name}: ${value === undefined ? 'missing' : 'present'}`);
  missing ||= value === undefined;
}

if (missing) {
  process.exitCode = 1;
}
