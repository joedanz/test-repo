# Available MCP Tools

This document lists all MCP (Model Context Protocol) tools available in this environment.

## Tool List

- `Task` - Launch a new agent to handle complex, multi-step tasks autonomously. Available agent type: general-purpose.
- `Bash` - Executes bash commands in a persistent shell session with optional timeout.
- `Glob` - Fast file pattern matching tool for finding files by name patterns.
- `Grep` - Powerful search tool built on ripgrep for searching file contents.
- `LS` - Lists files and directories in a given path.
- `ExitPlanMode` - Used when in plan mode to signal readiness to begin coding.
- `Read` - Reads file contents from the local filesystem.
- `Edit` - Performs exact string replacements in files.
- `MultiEdit` - Makes multiple edits to a single file in one operation.
- `Write` - Writes content to a file in the local filesystem.
- `NotebookRead` - Reads Jupyter notebook (.ipynb) files.
- `NotebookEdit` - Edits specific cells in Jupyter notebook files.
- `TodoWrite` - Creates and manages structured task lists.
- `WebSearch` - Performs web searches and returns formatted results.
- `WebFetch` - Fetches and processes content from URLs.

## Example Usage

```json
<function_calls>
<invoke name="$TOOL_NAME">
<parameter name="$PARAMETER_NAME">$PARAMETER_VALUE