<h1 align="center">Addis-software-test-backend 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> This project is deployed on AWS Lambda function and it uses MongoDb as a database. It also uses AWS DynamoDB but it is inactive for now. The other thing is the API is fully tested with Jest and it is deployed on AWS API Gateway.

### 🏠 [Homepage](https://wuz792tp80.execute-api.us-east-1.amazonaws.com/dev/)

### ✨ [Demo](https://chapimenge.me/addis-software-test-frontend/)

## API Features
The API uses pagination when fetching data. It is possible to fetch data by page and by limit. Also it is possible to sort the data by any field. Lastly, it is possible to search for data by any field.

Parameters for pagination and filters are:

    * `page`: The page number.
    * `limit`: The number of items per page.
    * `sort`: The field to sort by fields(name, salary, etc...) Default is `name`.
    * `name`: The field to by name
    * `gender`: The field to by gender

The Base URL is: https://wuz792tp80.execute-api.us-east-1.amazonaws.com/dev/

    - [GET] / : Get all the employee
    - [GET] /:id : Get an employee by id
    - [POST] / : Create an employee
    - [PUT] /:id : Update an employee
    - [DELETE] /:id : Delete an employee


## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests with Jest

```sh
npm test
```

## Known Issues

Any information exposed by the API is not real. Every employee has a random salary. Any information is not real. The API is only used for testing purposes.

**Any exposed information about cloud formation is only intended for showing the user how the project is deployed.**


## Author

👤 **Temkin Mengistu**

* Website: https://chapimenge.me
* Twitter: [@chapimenge](https://twitter.com/chapimenge)
* Github: [@chapimenge3](https://github.com/chapimenge3)
* LinkedIn: [@chapi-menge](https://linkedin.com/in/chapi-menge)
