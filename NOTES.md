# Notes
- Sizes.json file is a duplicate of card.json, assumption is that I was meant to use sizes.json to map the sizes to the cards.json file, sizes.json file has been ignored for now
- Initially used readFileSync, a synchronous method as to store all the changes in memory as I will need to only read the JSON file once, the drawback is that all the data is lost if the server is shutdown/restarted. Changed my mind and changed to the non-blocking asynchronous method
- Initially, I could only throw errors with a message. By extending the Error class, I've added the ability to include a status code property

# Improvements that can be made
- Using a database to store & update data
- Pagination to the list of cards
- Provide filtering, sorting etc
- Provide API versioning and a path to list all the endpoints
- Validation library like Zod which allows for a stricter validation than what I currently have
- Have development data & production data separate to allow for better flexibility
- Refactor endpoints to pull it out into its own router file, this will help in avoiding bloat in the server.ts file