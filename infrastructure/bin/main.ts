#!/usr/local/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { RoleStack } from '../lib/iam';

const app = new cdk.App();
new RoleStack(app, 'role', {
  env: {
    account: '123456789012', // dummy AWS account ID
    region: 'us-east-1',
  },
  roleName: 'MyRole',
  description: 'My role description',
  servicePrincipal: 'ecs-tasks.amazonaws.com',
  policyActions: ['s3:ListBucket', 's3:GetObject'],
});