// src/lib/services/storage.ts

// IndexedDB wrapper for caching tracks, playlists, and user preferences

const dbName = 'MusicCacheDB';
const dbVersion = 1;
const storeName = 'musicStore';

let db;

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onupgradeneeded = event => {
            db = event.target.result;
            db.createObjectStore(storeName, { keyPath: 'id' });
        };

        request.onsuccess = event => {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = event => {
            reject("Database failed to open: " + event.target.errorCode);
        };
    });
}

async function saveItem(item) {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(item);

    request.onsuccess = () => {
        console.log('Item saved to the database.');
    };

    request.onerror = event => {
        console.error('Error saving item: ', event.target.errorCode);
    };
}

async function getItem(id) {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(id);

    return new Promise((resolve, reject) => {
        request.onsuccess = event => {
            resolve(event.target.result);
        };

        request.onerror = event => {
            reject('Error retrieving item: ' + event.target.errorCode);
        };
    });
}

async function deleteItem(id) {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.onsuccess = () => {
        console.log('Item deleted from the database.');
    };

    request.onerror = event => {
        console.error('Error deleting item: ', event.target.errorCode);
    };
}

export { saveItem, getItem, deleteItem };