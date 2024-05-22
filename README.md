# Property_Hub

Property_Hub is an Express web server with a PostgreSQL database. The server manages properties and users. It employs CORS policy, JWT, Joi, and Morgan middleware.

## Property

Property endpoints support CRUD operations on properties. You can Create, Read, Update, and Delete properties. Data validation is implemented using Joi when creating properties.

## Users

User endpoints support CRUD operations on users. You can Create, Read, Update, and Delete users. Data validation is implemented using Joi when creating users. Additionally, bcrypt is used for user passwords, and JWT is utilized for user login.




