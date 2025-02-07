The idea of this project is to serve as a model and example for a data migration script for your data warehouse, using Firebase Firestore.

Here, I perform the data migration from a CSV file, including reading and inserting the data.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_URL = http://localhost:1880`

`APP_ID = your-firebase-service-id` 

`GOOGLE_APPLICATION_CREDENTIALS = path-firebase-credentials` 

## Usage/Examples

The change to your collection is important :P

```typescript
    // add your-collection
    const oldDocRef = firestore.db.collection('your-collection').doc(item.oldId);
    const newDocRef = firestore.db.collection('your-collection').doc(item.newId);
```

## Node-red

In case you're interested, I've provided a compose file with a Node-Red setup and a flow that creates a web server, opens a GET endpoint, reads a CSV file, separates it by columns, and returns the result.

It can be accessed at `http://localhost:1880/csv-file`

```bash
docker-compose up
```


<p align="center">
  Made with :heart: by <a href="https://github.com/jwcbmat" target="_blank">John</a>
</p>
