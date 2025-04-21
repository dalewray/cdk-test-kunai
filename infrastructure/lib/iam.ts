import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Role, ServicePrincipal, PolicyStatement, Policy } from 'aws-cdk-lib/aws-iam';
import { IamProps } from './props/iam-props';
import { CfnOutput } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';

function createRole(scope: Construct, id: string, props: IamProps) {
  const role = new Role(scope, id, {
    roleName: props.roleName,
    description: props.description,
    assumedBy: new ServicePrincipal(props.servicePrincipal),
  });

  const policy = new Policy(scope, 'Policy', {
    statements: [
      new PolicyStatement({
        actions: props.policyActions,
        resources: ['*'],
      }),
      new PolicyStatement({
        actions: ['s3:GetObject', 's3:ListBucket'], 
        resources: [
          `arn:aws:s3:::*`, 
          `arn:aws:s3:::*/*`,
        ],      
      }),
    ],
  })

  role.attachInlinePolicy(policy)
  return role;
}

export class RoleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: IamProps) {
    super(scope, id, props);

    const role = createRole(this, id, props);

    new CfnOutput(this, 'RoleArn', {
      value: role.roleArn,
      description: 'The ARN of the IAM role',
      exportName: 'RoleArn',
    });
  }
}


export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const roleArn = cdk.Fn.importValue('RoleArn');
    const role = iam.Role.fromRoleArn(this, 'ImportedRole', roleArn);

    const lambdaFunction = new lambda.Function(this, 'MyLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset('bin'), 
      role: role, 
    });
  }
}
