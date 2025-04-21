#!/usr/local/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { RoleStack } from '../lib/iam';
const accountId = process.env.CDK_DEFAULT_ACCOUNT || '123456789012'; // Use AWS-defined variable with a fallback

const app = new cdk.App();
new RoleStack(app, 'role', {
  env: {
    account: accountId,
    region: 'us-east-1',
  },
  roleName: 'MyRole',
  description: 'My role description',
  servicePrincipal: 'ecs-tasks.amazonaws.com',
  policyActions: ['s3:ListBucket', 's3:GetObject'],
});