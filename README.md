## Olaris React Client

This is the repository for the React frontend client for the open-source, community driven, media manager and transcoding server, [Olaris](https://www.gitlab.com/olaris/olaris-server).

If you're not a developer or just want to run Olaris, you should go to the [olaris-server repo](https://www.gitlab.com/olaris/olaris-server) for instructions on how to run it for yourself!

Otherwise, if you're interested in contributing, continue on below.

### Dev Environment Setup

You'll need node.js installed. The general recommendation is to use a version manager such as [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) for macOS/linux or [nvm-windows](https://github.com/coreybutler/nvm-windows).

You'll also need to install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/).

### Running the frontend locally

- Run `nvm use` in terminal to switch to the recommended version for the latest version.
- Run `yarn` in terminal to install all dependencies.
- Make a copy of the `.env.local.sample` file and rename it to `.env.local`
- Change the ip address/port as necessary for your setup.
- Run `yarn dev` in terminal to begin development.


### Changing the frontend port

Add the line `PORT=XXXX` on a new line in `.env.local` 

This will change the port for the react frontend running **locally**. Use this if you have a port conflict, the default is 3000.