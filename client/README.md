# Cash Dragon - Frontend

## Technologies

### [Vite](https://vitejs.dev/)

Vite does three major things for us:

1. Simplifies the setup and management of the technologies we're using.
   - Provides out-of-the-box support Typescript, React, PostCSS, Tailwind, and [Dotenv](https://www.npmjs.com/package/dotenv)
   - Has a large library of plugins for anything not natively supported.
2. Provides the features found in tools like [Webpack](https://webpack.js.org/) and [Rollup](https://rollupjs.org/).

   - For example, this allows us to create a proxy for the dev server.

3. Optimizes the production build

#### Documentation & Tutorials

- [Fireship - Vite in 100 Seconds](https://youtu.be/KCrXgy8qtjM?si=DvU9XrR-YghF7LA6)

### [Typescript](https://www.typescriptlang.org/)

TypeScript is simply a type safe version of JavaScript. It compiles directly into Javascript on build.

#### Documentation & Tutorials

- [Fireship - Typescript in 100 Seconds](https://youtu.be/zQnBQ4tB3ZA?si=i6VrYnP2C-OElaWn)
- [Fireship - Typescript Tutorial](https://youtu.be/ahCwqrYpIuM?si=Le1yasvXL1cbG3d3)

### [React](https://react.dev/)

React is the industry standard for creating reusable components. It also helps with state management.

#### Documentation & Tutorials

- [Fireship - React in 100 Seconds](https://youtu.be/Tn6-PIqc4UM?si=3dwpHx6Y5WsljKbP)
- [Fireship - React Playlist](https://youtube.com/playlist?list=PL0vfts4VzfNgUUEtEjxDVfh4iocVR3qIb&si=jmJh0qkJMn4YMKEO)

### [React Redux (Redux Toolkit)](https://redux-toolkit.js.org/)

After a while, state management in React can get a bit messy. Redux gives us the power to manage data on a more global scale. Eliminating any need to pass data down through a dozen components (aka. prop drilling).

### [Remix Router (Vite Plugin)](https://vite-remix-router.vercel.app/)

Just React works great for creating a single-page app, but a multi-page app requires a plugin. One option is [React Router](https://reactrouter.com/en/main), but it's a very manual tool. Remix Router builds on top of it, making route management as simple as file manage.

Remix Router also makes implementing page templates much simpler and allows us to load data earlier.

#### Documentation & Tutorials

- [Defining Routes](https://vite-remix-router.vercel.app/guides/defining-routes.html)
- [Using Loaders](https://vite-remix-router.vercel.app/guides/using-data-apis.html#loaders)

### [MUI - Material UI](https://mui.com/material-ui/getting-started/)

MUI provides a components library that follows Material UI's design guidelines. It'll save us from writing a lot of basic code and help create a clean UI.

#### Documentation & Tutorials

- [Components](https://mui.com/material-ui/all-components/)
- [Component API](https://mui.com/material-ui/api/accordion/)

### [Tailwind](https://tailwindcss.com/)

No one likes writing CSS. Hence, Tailwind. Unlike Bootstrap, it's utility-first, giving us much more control by default.

#### Documentation & Tutorials

- [Fireship - Tailwind in 100 Seconds](https://youtu.be/mr15Xzb1Ook?si=ArFHS_-GZfcVTPyT)
- [Fireship - Ultimate Tailwind CSS Tutorial](https://youtu.be/pfaSUYaSgRo?si=ChCeBqk2f2kuJi8U)

### [PostCSS](https://postcss.org/)

PostCSS itself doesn't do anything, but it allows us to add a huge [library of plugins](vhttps://www.postcss.parts/) that makes writing CSS easier. As we can't avoid CSS files all together, it will definitely come in handy.

### [ESLint](https://eslint.org/)

Writing good code is hard. ESLint will make sure that we are following best practices. Running it will alert us to mistakes we may have made.

### [Prettier](https://prettier.io/)

Prettier formats code. That simple.
