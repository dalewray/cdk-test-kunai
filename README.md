# CDK Test Instructions

This repository creates an IAM role with the AWS cdk. 

## Tasks
Please fork this repo and create a PR to your forked repository with the following tasks.

1. Create an AWS resource that consumes this role. 
    - You may need to edit the role and its attached permissions to be relevant for your created resource.
1. Write a test and ensure your deployment passes this test when `npm test` is run.
    - This test does not need to be overly complicated but should have a valid reason to exist.
1. Be ready to speak on how you may enhance this deploy process or optimizations should this project be expanded to include a entire suite of interconnected AWS resources.

When you have completed these task please make sure your repo is accessible and send your PR for review.

## Rules
1. Please allot about 1 hours worth of time to this test. 
    - If you find yourself committing over 1 hour of work please consider reducing complexity. 
    - We are more interested in discussing your troubleshooting and design process over marveling at your robust coding prowess.
1. Use object based coding patterns that are modular and reusable.
    - Refrain from hardcoding any values in your `lib` directory
1. There is no restriction in using existing code or the internet to help complete these tasks. Just be sure to share your process and explain your design choices in the interview.
1. You do not need to perform a `cdk deploy` but your code should successfully `cdk synth`
