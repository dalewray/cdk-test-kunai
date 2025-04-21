import { handler } from '../bin/handler';
import { S3 } from 'aws-sdk';
import { readS3 } from '../lib/awsMethods';

jest.mock('aws-sdk', () => {
    const mockS3 = {
        getObject: jest.fn(),
    };
    return { S3: jest.fn(() => mockS3) };
});

jest.mock('../lib/awsMethods', () => ({
    readS3: jest.fn(),
}));

const mockS3 = new S3() as jest.Mocked<S3>;
const mockReadS3 = readS3 as jest.MockedFunction<typeof readS3>;

describe('handler', () => {
    const callback = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });


    it('should return 200 with file content if S3 read is successful', async () => {
        const event = {
            queryStringParameters: {
                BUCKET_NAME: 'test-bucket',
                fileName: 'test-file.txt',
            },
        } as any;

        const mockData = { Body: Buffer.from('File content') };
        mockReadS3.mockResolvedValue(mockData as any);

        await handler(event, {} as any, callback);

        expect(mockReadS3).toHaveBeenCalledWith('test-file.txt', 'test-bucket', mockS3);
        expect(callback).toHaveBeenCalledWith(null, {
            statusCode: 200,
            body: JSON.stringify({
                message: 'File retrieved successfully!',
                fileContent: 'File content',
            }),
        });
    });


});