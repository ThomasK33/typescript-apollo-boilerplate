# Typescript Apollo Boilerplate

## Installation

```javascript
npm install
```

---

## Getting started

**Before getting started, rename the '.env.example' file to '.env' and fill in the required values.**

Build the project

```javascript
npm run build
```

Run from already build source

```javascript
npm start
```

Run without building

```javascript
npm run start:ts
```

Build & run the project

```javascript
npm run start:clean
```

Start local live development server

```javascript
npm run start:dev
```

---

## Testing

Run tests:

```javascript
npm run build
npm run lint
npm run test
```

Run validate (all tests in parallel; same as CI):

```javascript
npm run validate
```

---

## Coding

Adding new GraphQL module

```javascript
npm run new:module
// or if hygen is installed globally
hygen module new
```

Adding new GraphQL directive

```javascript
npm run new:directive
// or if hygen is installed globally
hygen directive new
```