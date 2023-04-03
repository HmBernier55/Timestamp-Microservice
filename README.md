# Timestamp Microservice

This is the code for the Timestamp Microservice project. Instructions for building the project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/timestamp-microservice

## Code Explanation:
* The code includes two api routes:
    * `/api`
        * Returns a JSON object with unix and utc keys pertaining to the current date and time of the request:
        ```
        {
            unix: <unix number>,
            utc: <date string>
        }
        ```
    * `/api/:date_string`
        * Returns a JSON object with unix and utc keys pertaining to either the unix number or the date string (YYYY-MM-DD) inputted into the route:
        ```
        {
            unix: <unix number>,
            utc: <date string>
        }
        ```
        * If an invalid date string is inputted into the route, a JSON object with an error key will return:
        ```
        {
            error: "Invalid Date"
        }
        ```
* The code is hosted on the local port 3000