#!/bin/bash

OUTPUT_FILE="mcp-output.txt"

echo "Current UTC time is 2025-07-28 01:23:46, and the time in America/New_York is 2025-07-27 21:23:46." > "$OUTPUT_FILE" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "Successfully wrote MCP output to $OUTPUT_FILE"
else
    echo "Error: Failed to write to $OUTPUT_FILE" >&2
    exit 1
fi