# DiscordJS boilerplate for bots

The goal of this WIP, is to create a clean, stable, scalable and consistent boilerplate for creating Discord bots.
It uses TypeORM (which supports most SQL databases), Inversify, DiscordJS and some other small packages.

Right now it's set up to use a local postgres database with docker-compose. 

## Functionality
I aim to incorporate the main functionality in this boilerplate.

- Caching queries to limit amount of database requests (using TypeORM caching strategies)
- Take care of adding/removing servers from database on add/leave
- DiscordJS error / warnings
- Basic database schema setup (servers / users / etc)
- Automatically fetch right prefixes per server
- Easy set up for commands
- Taking care of disconnecting / reconnecting states and logging
- More basic functionality any bot has
- A lot of logging! In nice colors ;)
