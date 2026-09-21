#!/usr/bin/env bash
# Fail CI if a production bundle still references localhost API URLs.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUNDLE="$(ls "$ROOT"/dist/assets/index-*.js 2>/dev/null | head -1)"

if [[ -z "$BUNDLE" ]]; then
  echo "ERROR: dist/assets/index-*.js not found — run npm run build first"
  exit 1
fi

if grep -q 'localhost:8080\|localhost:8000' "$BUNDLE"; then
  echo "ERROR: production bundle still contains localhost API URL:"
  grep -oE 'http://localhost:[0-9]+' "$BUNDLE" | sort -u
  exit 1
fi

if ! grep -q 'revenant-api-171384186168.asia-south1.run.app' "$BUNDLE"; then
  echo "ERROR: production API URL missing from bundle"
  exit 1
fi

echo "OK: production bundle uses hosted API URL"
