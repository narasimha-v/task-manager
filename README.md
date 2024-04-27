# Backend Template

Task manager api's built using typescript, node, express & mongo

## Authors

-   [@narasimha-v](https://github.com/narasimha-v)

## Features

-   Custom error handling &
-
-   Clean structure seperating out routes & services

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URI`

## Run Locally

Clone the project

```bash
git clone https://github.com/narasimha-v/task-manager
```

Go to the project directory

```bash
cd task-manager
```

Install dependencies

```bash
yarn install
```

Start the server

```bash
yarn run start
```

## Running Tests

To run tests, run the following command

```bash
yarn run test
```

## API Reference

#### Get all tasks

```http
  GET /tasks
```

#### Get task by id

```http
  GET /tasks/${id}
```

#### Create task

```http
  POST /tasks
```

| Parameter     | Type     | Description  |
| :------------ | :------- | :----------- |
| `name`        | `string` | **Required** |
| `description` | `string` | **Required** |

#### Update task

```http
  PUT /tasks/${id}
```

| Parameter     | Type          |
| :------------ | :------------ |
| `name`        | `string`      |
| `description` | `string`      |
| `status`      | `TASK_STATUS` |

#### Delete task

```http
  DELETE /tasks/${id}
```

## Production URL

[Task manager api]()

## License

[MIT](https://choosealicense.com/licenses/mit/)
