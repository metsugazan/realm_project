import Realm from 'realm';

import { BookSchema_ } from '../schemas/BookSchema';

export const realm = new Realm({schema: [BookSchema_], deleteRealmIfMigrationNeeded: true});