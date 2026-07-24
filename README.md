# vite-plus issue #2189 reproduction

Minimal reproduction for
[voidzero-dev/vite-plus#2189](https://github.com/voidzero-dev/vite-plus/issues/2189).

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
bunx vp run release
```

Issue #2189 is reproduced if either variable is reported as `missing`.

## GitHub Actions

The local comparison cannot reproduce GitHub's OIDC environment. The
`Reproduce issue 2189` workflow runs both paths with `id-token: write` using
the versions from the issue report. Push this project to a GitHub repository
and run the workflow manually to compare the two steps.
