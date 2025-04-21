import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { readS3 } from '../lib/awsMethods';

const s3 = new S3();

export const handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
    try {
        const bucketName = event.queryStringParameters?.BUCKET_NAME; 
        const fileName = event.queryStringParameters?.fileName; 

        if (!bucketName || !fileName) {
            callback(null, {
                statusCode: 400,
                body: JSON.stringify({ message: 'Bucket name or file name is missing.' }),
            });
            return;
        }

        const data = await readS3(fileName, bucketName, s3)

        if(!data) {
            throw new Error('Cannot read file contents')
        }
        
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'File retrieved successfully!',
                fileContent: data.Body?.toString('utf-8'), 
            }),
        };

        callback(null, response);
    } catch (error) {
        console.error('Error reading file from S3:', error);
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({ 
                message: 'Failed to retrieve file from S3.', 
                error: error instanceof Error ? error.message : 'Unknown error' 
            }),
        });
    }
};