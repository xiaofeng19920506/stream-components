# @xiaofeng19920506/ui

Private React component library with consistent tokens and CSS Modules.

![GitHub Packages](https://img.shields.io/badge/GitHub%20Packages-private-success)

## Install

1. Make sure your npm is configured for GitHub Packages (per-user or project-level):

```
@xiaofeng19920506:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

2. Install the package:

```
npm i @xiaofeng19920506/ui
```

Peer deps: React 17/18.

## Usage

```tsx
import { Button, Text, TextInput, Tooltip } from "@xiaofeng19920506/ui";

export default function Example() {
  return (
    <div>
      <Text as="h2" variant="title">
        Hello
      </Text>
      <Button>Primary</Button>
      <Tooltip content="Hi">
        <Button variant="secondary">Hover</Button>
      </Tooltip>
      <TextInput label="Name" placeholder="Type..." />
    </div>
  );
}
```

## Theming

Edit `src/styles/tokens.css` to change colors (e.g., `--button-color`, `--button-color-secondary`).

## Storybook

- Dev: `npm run -w @xiaofeng19920506/ui storybook`
- Static build: `npm run -w @xiaofeng19920506/ui build-storybook`

## Build & Publish

- Build: `npm run -w @xiaofeng19920506/ui build`
- Publish to GitHub Packages: `npm publish --workspace @xiaofeng19920506/ui`
