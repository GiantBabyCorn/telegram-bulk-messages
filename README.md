# Set Up

It's recommended to use [yarn](https://yarnpkg.com/) as package manager.

## Install Dependencies

```bash
yarn
```

After installation, you'll need to obtain an API ID and hash:

1. Login into your [telegram account](https://my.telegram.org/)
2. Then click "API development tools" and fill your application details (only app title and short name required)
3. Finally, click "Create application"

## List id

Create a `.list` file file listing user ids separated by linebreaks:

```bash
# .list

@foo
@bar
...

# You can also omit the at sign

foo
bar
...

```

## Run

```bash
yarn start
```

and follow the instructions displayed on the terminal.
