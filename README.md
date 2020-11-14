# AWS-shop-be
There is one part of AWS shop, which include backend part of that API

<p> 
    <strong>For creating new service you should enter next command: </strong>
    <code>
        serverless create --template [template name, as example: aws-nodejs] --path [service_name]
    </code>
</p>
<p> 
    <strong>For deploy service you should go to your service folder: cd [your_service_folder_name] and enter next command: </strong>
    <code>
        sls deploy
    </code>
</p>

<p>
    For creating Public Bucket Policy, you need to dismiss "Block all public access" option and add next policy in field:
    <pre>
            {
                "Version": "2008-10-17",
                "Statement": [
                    {
                        "Sid": "AllowPublicRead",
                        "Effect": "Allow",
                        "Principal": {
                            "AWS": "*"
                        },
                        "Action": "s3:GetObject",
                        "Resource": "arn:aws:s3:::aws-shop-be-import-service/*"
                    }
                ]
            }
    </pre>
</p>

