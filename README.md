# Typescript Apollo Boilerplate

## Requirements

Gloabl installation

```javascript
(sudo) npm install -g typescript ts-node tslint nodemon mocha hygen
npm install
```

Local installation

```javascript
npm install
npm install --only=dev
```

---

## Getting started

**Before getting started, rename the '.env.example' file to '.env' and fill in the required values.**

Build & run the project:

```javascript
npm start
```

Run without building

```javascript
npm run start:ts
```

Run from already build source

```javascript
// assuming "npm run build" has already been run
npm run start:local
```

Start local live development server

```javascript
nodemon
```

---

## Testing

Run tests:

```javascript
npm run lint
npm run test
```

---

## Coding

Adding new GraphQL module

```javascript
hygen module new
```

Adding new GraphQL directive

```javascript
hygen directive new
```