## MCP Setup and Questioning

We used Perplexity's deep research mode to answer questions about the project, to help us with our market research, and to help us brainstorm ideas. Some of it was referenced in ai/guides, but we figured we'd put the entire conversation here as well.

Here's a link to our conversation: [MCP Setup and Questioning](https://www.perplexity.ai/search/walking-app-ai-project-Hv8aBJBLQTWT3UNuWXblLw#0)

---

## Context7 MCP Server

**Installed:** February 23, 2026

### What is Context7?

Context7 is an MCP (Model Context Protocol) server that provides up-to-date, version-specific documentation and code examples from source repositories directly into AI prompts. It eliminates outdated training data and hallucinated APIs.

### Key Benefits

- ✅ **Current Documentation** - Fetches real-time docs from source repos
- ✅ **Version-Specific** - Gets docs for exact library versions
- ✅ **No Hallucinations** - Real APIs, not made-up ones
- ✅ **Automatic Integration** - Works seamlessly with Cursor

### Configuration

**Location:** `~/.cursor/mcp.json`

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {}
    }
  }
}
```

### Usage

Context7 is configured to work automatically when you need library/API documentation (see `.cursor/rules/project.md`). You can also explicitly request it:

```
Create a React component with TypeScript. use context7
```

Or specify exact libraries:

```
Implement authentication with Supabase. use library /supabase/supabase for API and docs.
```

### API Key (Optional)

For higher rate limits, get a free API key at [context7.com/dashboard](https://context7.com/dashboard) and add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Available Tools

- `resolve-library-id` - Finds the correct Context7 library ID for a given library name
- `query-docs` - Retrieves documentation for a specific library

### Resources

- [Context7 Website](https://context7.com)
- [GitHub Repository](https://github.com/upstash/context7)
- [Documentation](https://context7.com/docs)
- [All Supported Clients](https://context7.com/docs/resources/all-clients)

### Restart Required

After initial setup, **restart Cursor** to activate the Context7 MCP server.
