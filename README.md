# Full-Stack Take Home

This is the starter-code for our full-stack take home assessment. This project is split into two directories:

- `api/` is the Ruby on Rails API server.
- `console/` is the React/TS frontend.

The API comes with the following models:

| Model        | Description                                                                |
| ------------ | -------------------------------------------------------------------------- |
| `Chatroom`   | Chatrooms represent conversations with 9-1-1 callers during an emergency.  |
| `NatureCode` | Nature codes represent categories that describe the nature of a 9-1-1 call |

The API has also been set up with GraphQL.

- All requests will go through the `POST /graphql` route

- You can test the graphql operations by visiting `/graphiql`. You can use tools like [GraphiQL](https://github.com/graphql/graphiql)
  or [Postman](https://www.postman.com/), or `cURL`

The console has been set up with [Apollo Client](https://www.apollographql.com/docs/react) and [Material UI](https://mui.com/material-ui/getting-started/usage/) and [React Router](https://reactrouter.com/en/main).

- All GraphQL operations are defined in `console/src/graphql/operations` with `.graphql` files

- You can run `yarn codegen` to generate TypeScript types and React hooks for GraphQL operations

## Assignment

### Part 1 - Updating Chatroom Descriptions

Users should be able to update a chatroom's description

- Add an "Edit" button to chatroom list item descriptions

- Clicking the "Edit" button should make the description editable and add two buttons: (1) cancel, and (2) save

- If saved, the chatroom's description should be updated

### Part 2 - Resolving Chatrooms

Users should be able to resolve chatrooms.

- Add a "Resolve" button to chatroom list items

- Clicking on the "Resolve" button should prompt the user to confirm they want to resolve the chatroom

- If confirmed, the chatroom's `archived` field should be updated to `true` and should be removed from the chatrooms page

### Extra Credit - Adding Chatroom Notes

Users should be able to add timestamped notes to chatrooms

- Create a new model `ChatroomNote`, representing a text note on a `Chatroom`

  - A `Chatroom` can have many `ChatroomNote`s

  - `ChatroomNotes` cannot be edited, but they can be created and deleted

- Show all existing `ChatroomNotes` inside of the `ChatroomDetails` card, displaying:

  - The text content of the note

  - The datetime when the note was created

- Add a "Create Note" button to `ChatroomDetails` that allows users to create chatroom notes

- Add a "Delete Note" button on each note

## Expectations

- Correctness and completeness of the implemented features.

- Code quality, including readability, maintainability, and adherence to best practices.

- Proper use of Ruby on Rails, GraphQL, React, and TypeScript.

- Error handling and validation.

- Test coverage and quality.

- Git usage and commit history.

## Getting Started

### Running the API

Make sure you have [ruby installed](https://www.ruby-lang.org/en/documentation/installation/)!

#### Installation + Set Up

First, let's install all of the necessary dependencies

```sh
cd api
bundle install
```

Next, let's set up the database

```sh
cd api
bundle exec rails db:migrate db:seed
```

Finally, we can run the server!

```sh
cd api
bundle exec rails s
```

### Running the console

This project uses [yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable), so make sure you've got it installed!

#### Installation + Set Up

First, let's install all of the necessary dependencies

```sh
cd console
yarn install
```

All we need to do now is run the dev server!

```sh
cd console
yarn start
```
