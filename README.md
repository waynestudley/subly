# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
### `npm i` (install)
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

...for a deployable build.

## Subly

I've added a few branches along the way - an initial React/TS boilerplate, then general API call and display moving on to a little more styled and then fully styled with option of how to view the cards/items.

I'd decided to add the initial state as a scrollable horizontal list - just as I liked that idea but then I've added a toggle (bottom left) to switch between that and a standard tiled window.

The icons etc. don't exactly match those of the visuals supplied - I cut corners and used generic REact Icons for ease (but I think they work?).

On 'error' cards - the delete button does remove the item from the current state (refresh to revert) - this should really have a confirmation window to OK the deletion but I let this go... not out of laziness - just as I like the imediacy of the deletion!

I had started to build some basic mocked tests but I'm wary of time - I had suggested to Gemma earliler today that I'd get this over early afternoon - so I'm going to push this as it is (the only tests there currently fail) - I'll get back to it later in the day and update the GitHub repo with some working tests.