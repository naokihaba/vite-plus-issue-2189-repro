# vite-plus issue #2189 reproduction

Minimal reproduction for
[voidzero-dev/vite-plus#2189](https://github.com/voidzero-dev/vite-plus/issues/2189).

## Current result: reproduced

The issue reproduces when package script caching is enabled with
`run.cache: true`. The workflow uses `vite-plus@0.2.9`, Bun 1.3.14, Node.js
24.18.0, and the explicit step-level OIDC `env` mappings from the issue.

| Command | npm OIDC result |
| --- | --- |
| `npm run release` | Requests a GitHub ID token successfully |
| `vp run release` | Skips OIDC because the GitHub ID-token environment is incomplete |

The `vp run` log contains the reported message:

```text
npm silly oidc Skipped because incorrect permissions for id-token within GitHub workflow
```

See the
[reproducing GitHub Actions run](https://github.com/naokihaba/vite-plus-issue-2189-repro/actions/runs/32353986859).

The root `.npmrc` sets `dry-run=true`, so npm executes its real OIDC selection
and `npm stage publish` flow without creating a staged version or changing the
registry.

The project mirrors the reported command chain:

```text
vp run release
└─ npm run -w naokihaba release
   └─ npm stage publish --provenance
```

The package under test is
[naokihaba](https://www.npmjs.com/package/naokihaba), using the next version
`1.0.9` in dry-run mode.

## Setup

```sh
bun install
```

## GitHub Actions

Run the `Reproduce issue 2189` workflow manually. It grants
`id-token: write`, runs the direct npm control first, and then runs the same
release script through `vp run`. Local execution cannot provide GitHub's OIDC
request URL and token, so the behavior must be compared in GitHub Actions.
