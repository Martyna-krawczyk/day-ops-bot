#!/bin/bash
set -eu

echo "SAM is building..."
sam build --use-container

echo "SAM is deploying..."
sam deploy