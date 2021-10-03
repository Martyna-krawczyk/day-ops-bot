#! /usr/bin/env bash
set -eu

echo "--- Build"
sam build

echo "--- Local Invoke"
sam local invoke DayOpsBot