# Project Overview

This project is the base template of our webdevelopment agency in germany named "Fullstack Factory". It is built in the latest version of NextJS, using Typescript, a customized version of PayloadCMS 3.X (latest), TailwindCSS, Postgres NeonDB and Vercel Blob Store. Also it use multiple other libraries as well and has a Folder named "Relume" in the Root directory. This one holds all ReactJS Components from the Relume Database inside.

# Key Documentation URL's

- NextJS 15 -
- PayloadCMS -
- TailwindCSS -
- Relume -

# Project Structure

- **Relume**: A Folder holding the Relume React Components sorted in different sub-directories ("/Relume/Layout/Layout1/component.tsx)
- **App**: Main Folder with the Project Structure Inside
- **Blocks**: Here the main building parts (Payload Blocks) are defined. They contain a Component.tsx, a config.ts and an index.ts for exporting
- **Collections**: Here the Collections are defined. They use Blocks and other Building Parts to combine them. For example the "Pages Collection" combines Hero-Section Components, a Set of Blocks, multiple Plugins and a Routing Structure for easily building sub-pages over the Admin Panel

# Development Guidelines

- Use TypeScript for Type Safety
- Follow the Coding Standards defined in the ESLint configuration
- Ensure all Components are perfectly responsive, mobile-first-approach, accessible and look good on all devices. Make them look exactly like the original Relume React Components
- Use TailwindCSS for styling Purposes
- After a Task is finished, make sure all the Migrations are up-to-date
