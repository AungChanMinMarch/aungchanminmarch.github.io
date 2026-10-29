#!/usr/bin/env bash
# Usage: ./runtests.sh lab09 [lab10 ...]
# Runs pytest in every folder starting with each prefix and prints one summary line per folder.

if [ $# -eq 0 ]; then
    echo "Usage: $0 PREFIX [PREFIX ...]   (e.g. $0 lab09)" >&2
    exit 1
fi

cd "$(dirname "$0")" || exit 1

pytest=.venv/bin/pytest
[ -x "$pytest" ] || pytest=pytest

for prefix in "$@"; do
    found=0
    for d in "$prefix"*/; do
        [ -d "$d" ] || continue
        found=1
        printf "%s " "${d%/}"
        "$pytest" --import-mode=importlib "$d" -q --tb=no -rN 2>&1 | tail -1
    done
    [ $found -eq 1 ] || echo "$prefix: no matching folders"
done
