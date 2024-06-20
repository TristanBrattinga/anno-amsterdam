# Anno Amsterdam :x: :x: :x:

## Team Members

- Manoah Tervoort
- Quinten Kok
- Tristan Brattinga

## Assignment

The Meesterproef is the final project of the minor Web Design & Development. It's about applying everything you've learned by working on a real project for a real client.

## The Concept

ANNO AMSTERDAM is an app that allows users to find information, based on their location in the physical space, unlocking the history and culture of Amsterdam.

## Development

This project is a mono-repo that contains the following packages:

- [App](./apps/web/) - The web app
- [Backoffice](./apps/office/) - The backoffice (CMS)
- [ESLint Config](./packages/config/) - The ESLint configuration
- [UI](./packages/ui/) - The UI components that are shared between the web app and the backoffice

### Prerequisites

- Git
- Node.js v20
- Yarn v4
- IDE (VS Code, WebStorm, etc.)

### Installation

1. Clone the repository

   ```bash
   git clone git@github.com:TristanBrattinga/anno-amsterdam.git
    ```

2. Install dependencies

    ```bash
    yarn install
    ```

3. Copy the values in `.env.example` of [apps/web](./apps/web/.env.example) and [apps/office](./apps/office/.env.example) to `.env` files and fill in your own values

4. Run dev servers ([http://localhost:5173](http://localhost:5173) for the backoffice and [http://localhost:5174](http://localhost:5174) for the web app)

    ```bash
    yarn dev
    ```

> [!NOTE]  
> For more information about a specific package, please refer to the README.md file in that package's directory.

### Scripts

```bash
# Run the dev server for both the web app and the backoffice
$ yarn dev

# Build the web app and the backoffice for production
$ yarn build

# Lint the entire code base
$ yarn lint

# Format the entire code base
$ yarn format
```

> [!NOTE]  
> For more package specific scripts, please refer to the README.md file in the package's directory.

## Structure

- `apps` - Contains the web app and the backoffice
- `packages` - Contains shared packages used for development
- `package.json` - Contains the dependencies and scripts for the entire project

> [!NOTE]  
> For more information about the project structure of a specific app, please refer to the README.md file in the package's directory.

## Sources

- [SvelteKit](https://kit.svelte.dev/)
- [Turborepo](https://turbo.build/repo)

## Design Rationale

The design rationale can be found in the [WIKI](https://github.com/TristanBrattinga/anno-amsterdam/wiki)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
