import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log('PUT to the jate database');

  /// create connection to jate database and specify version
  const jateDb = await openDB('jate', 1);

  // create new transaction and specify store and data privlieges
  const tx = jateDb.transaction('jate', 'readwrite');

  // open up object store
  const store = tx.objectStore('jate');

  // use the .put() method and pass in content to add to jate database
  const request = store.put({ id: id, value: content });

  // get confirmation of request
  const result = await request;
  console.log('Data saved to the JATE database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the jate database');

  // create connection to jate database and specify version
  const jateDb = await openDB('jate', 1);

  // create new transaction and specify store and data privlieges
  const tx = jateDb.transaction('jate', 'readonly');

  // open up object store
  const store = tx.objectStore('jate');

  // use the .getAll() method to get all data in the jate database
  const request = store.getAll();

  // get confirmation of request
  const result = await request;
  console.log('result.value', result);
  return result.value;
};

initdb();
