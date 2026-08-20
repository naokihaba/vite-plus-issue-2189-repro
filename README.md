# vite-plus issue #2189 reproduction

Minimal reproduction for
[voidzero-dev/vite-plus#2189](https://github.com/voidzero-dev/vite-plus/issues/2189).

## Current result: not reproduced

The reported environment-forwarding behavior does not reproduce with the
command chain and explicit step-level `env` mappings documented in the issue.
In a GitHub Actions run using `vite-plus@0.2.4`, Bun 1.3.14, and Node.js
24.18.0, both the control and `vp run` paths received non-empty values for the
two OIDC environment variables:

| Command | `ACTIONS_ID_TOKEN_REQUEST_URL` | `ACTIONS_ID_TOKEN_REQUEST_TOKEN` |
| --- | --- | --- |
| `npm run release` | `present` | `present` |
| `vp run release` | `present` | `present` |

See the successful
[GitHub Actions run](https://github.com/naokihaba/vite-plus-issue-2189-repro/actions/runs/32350671026).

This repository checks environment-variable forwarding only. It does not run
`npm stage publish` or publish a package.

The project mirrors the reported command chain:

```text
vp run release
└─ npm run -w @repro/publisher release
   └─ node scripts/check-oidc-env.mjs
```

It uses placeholder values and never prints token contents.

## Setup

```sh
bun install
```

## Control

```sh
ACTIONS_ID_TOKEN_REQUEST_URL=https://example.invalid/oidc \
ACTIONS_ID_TOKEN_REQUEST_TOKEN=repro-token \
npm run release
```

Both variables should be reported as `present`.

## Reproduction

```sh
ACTIONS_ID_TOKEN_REQUEST_URL=https://example.invalid/oidc \
ACTIONS_ID_TOKEN_REQUEST_TOKEN=repro-token \
vp run release
```

Issue #2189 is reproduced if either variable is reported as `missing`.

## GitHub Actions

The local comparison cannot provide real GitHub OIDC values. The
`Reproduce issue 2189` workflow runs both paths with `id-token: write`, applies
the explicit step-level `env` mappings from the issue, and uses the versions
from the report. It checks whether each value is non-empty without printing
the value.
