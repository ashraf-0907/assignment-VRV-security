import {
	Db, FindOptions, Filter, Document, UpdateResult, UpdateFilter,
	UnorderedBulkOperation, FindCursor, WithId
} from 'mongodb'
import { MongodbConnection } from "../../mongodb-connection";


export abstract class MongodbConnector {

    protected mongodbConnection: MongodbConnection;

    constructor(mongodbConnection: MongodbConnection){
        this.mongodbConnection = mongodbConnection;
    }

    protected getDb(): Db {
		if (!this.mongodbConnection.getDb()) {
			throw Error('Database not initialised');
		}
		return this.mongodbConnection.getDb();
	}

    protected async saveDocument(collectionName: string, mongoDBfilterObject: Filter<Document>, document: any): Promise<void> {
		await this.getDb().collection(collectionName).updateOne(mongoDBfilterObject, { $set: document });
	}

	protected async saveDocuments(collectionName: string, mongoDBfilterObject: Filter<Document>, document: any): Promise<void> {
		await this.getDb().collection(collectionName).updateMany(mongoDBfilterObject, { $set: document });
	}

	protected async createDocument(collectionName: string, document: any): Promise<any> {
		return await this.getDb().collection(collectionName).insertOne(document);
	}

	protected async createDocuments(collectionName: string, documents: any[]): Promise<any> {
		return await this.getDb().collection(collectionName).insertMany(documents);
	}

	protected async getDocument(collectionName: string, mongoDBfilterObject: Filter<Document>, options: FindOptions<Document> = {}): Promise<any> {
		return await this.getDb().collection(collectionName).findOne(mongoDBfilterObject, options);
	}

	protected async getDocuments(collectionName: string, mongoDBfilterObject: Filter<Document>, options: FindOptions<Document> = {}): Promise<any[]> {
		if (!options['readPreference']) {
			options['readPreference'] = 'secondary';
		}
		const documents = this.getDb().collection(collectionName).find(mongoDBfilterObject, options);
		return await documents.toArray();
	}

	protected getFindCursor(collectionName: string, mongoDBfilterObject: Filter<Document>, options: FindOptions<Document> = {}): FindCursor<WithId<Document>> {
		if (!options['readPreference']) {
			options['readPreference'] = 'secondary';
		}
		return this.getDb().collection(collectionName).find(mongoDBfilterObject, options);
	}

	protected async getDocumentsCount(collectionName: string, mongoDBfilterObject: Filter<Document>, options: FindOptions<Document> = {}): Promise<number> {
		if (!options['readPreference']) {
			options['readPreference'] = 'secondary';
		}
		return await this.getDb().collection(collectionName).countDocuments(mongoDBfilterObject, options);
	}

	protected async deleteDocument(collectionName: string, mongoDBfilterObject: Filter<Document>): Promise<boolean> {
		const result = await this.getDb().collection(collectionName).deleteOne(mongoDBfilterObject);
		return result.acknowledged;
	}


	protected async getCollection(collectionName: string): Promise<any> {
		const collection = this.getDb().collection(collectionName).find({}, { readPreference: 'secondary' });
		return await collection.toArray();
	}

	protected async deleteDocuments(collectionName: string, mongoDBfilterObject: Filter<Document>): Promise<boolean> {
		const result = await this.getDb().collection(collectionName).deleteMany(mongoDBfilterObject);
		return result.acknowledged ? true : false;
	}

	protected getBulkOperator(collection: string): UnorderedBulkOperation {
		return this.getDb().collection(collection).initializeUnorderedBulkOp();
	}

	protected async getAggregation(collection: string, aggregationFilter: any, options = {}): Promise<any[]> {
		const cursor = this.getDb().collection(collection).aggregate(aggregationFilter, options);
		return cursor.toArray();
	}

    protected async updateOne(collection: string, filter: Filter<Document>, updateData: any, options?: {}): Promise<UpdateResult> {
		return await this.getDb().collection(collection).updateOne(filter, updateData, options);
	}

	protected async updateMany(collection: string, filter: Filter<Document>, updateData: UpdateFilter<Document>, options?: {}): Promise<boolean> {
		const response = await this.getDb().collection(collection).updateMany(filter, updateData, options);
		return response.acknowledged ? true : false;
	}
}