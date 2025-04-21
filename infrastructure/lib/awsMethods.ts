interface S3Params {
    Bucket: string;
    Key: string;
}

interface S3 {
    getObject(params: S3Params): { promise: () => Promise<any> };
}

export const readS3 = async (fileName: string, bucketName: string, s3: S3): Promise<any> => {
    const params: S3Params = {
        Bucket: bucketName,
        Key: fileName,
    };

    return await s3.getObject(params).promise();
};

