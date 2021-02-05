# projectone
Link to the project requirements:
https://docs.google.com/document/d/1wuHRYDgAzvgjHvaKVxGZY76KnuXPSKNq3Tq8-54dkzg/edit?usp=sharing


Technologies Used
DynamoDB
Express.js
React
TypeScript

Features
* As a user : login,submit a request for reimbursement,submit a proof for reimbursement requested if needed by Benco for final approval.
* As a supervisor : login, can approve or reject a reimbursement claim made by an employee reporting to them.
* As a department head : login , can approve or reject a reimbursement claim made by an employee whose claim was approved by their immediate supervisor.
* As a Benco : login , can approve or reject a reimbursement claim made by an employee whose claims were approved by their supevisor and department head,can request for a proof to disburse the amount requested.
* System : calculates the reimbursement amount eligible for a single claim based on the type of reimbursment claim made, update the reimaining reimbursement amount by deducting the approved amount from eligible annual amount of 1000$ 

To-do list:
* As a supervisor/department head / Benco - can request more information to approve the claim made to the employee or their respective sub-ordinates.
* System - system needs to update the remaining reimbursement for a new claim after deducting it from the exiting balance after another claim has been approved.
* user - should be able to submit a video(if claim requires presentation) or document as a proof to support the reimbursement claim they had requested for.


Getting Started
* Clone the repository using `git clone https://github.com/maddiet1223/projectone`
* Backend setup:
                        1.Navigate to project folder
                        2. `npm install typecript'
                        3. `npx tsc --init`- for tsconfig file.
                            1. "target": "es5",                    
                               "module": "commonjs",
                            2. in the tsconfig file( uncomment the commented out) 
                                "outDir": "./build",                      
                                "rootDir": "./src", 
                        4. npm init
                           1. entry point: app.js
                        5. `npm install express --save`
                        6. `npm install`
                        7. `npx express-generator`
                        8. `npm install --save-dev babel-jest @babel/core @babel/preset-env @babel/preset-typescript`
                            1.Create babel.config.js
                             ```json
                              module.exports = {
                              presets: [
                              ['@babel/preset-env', {targets: {node: 'current'}}],
                              '@babel/preset-typescript'
                              ]
                            };
                            ```
                       9. For unit testing 
                        1. `npm install --save-dev @types/jest`
                       10.For logging 
                          1.`npm install --save log4js`
                          2. Create `logconfig.json`
                       11.For environment variables
                          1.`npm install --save dotenv`
                          2. add .env to .gitignore
                          3. backend .env file :CLIENT=http://localhost:3001
                          4. frontend .env file: PORT = 3001
                      12.For Dynamo DB
                        1.Configure AWS account  ` aws configure` (use the credentials after you create a user in AWS)
                        2.`npm install --save aws-sdk`
                      13.For CORS:
                            1.`npm install --save cors`.
                            2. `npm install --save-dev @types/cors`.      
                            3.  Add `import cors from 'cors';` and `app.use(cors());`
                      14. install memory store : ` npm install express-session memorystore`      

  * Frontend setup:
    1. `npm install -g create-react-app`
    2. `npx create-react-app my-app-name --template typescript`
    3. `cd my-app-name`
    4. `npm install --save axios`
    5. `npm install --save react-router-dom`
    
   Note : In your backend package.json file add 
      "scripts": {
            "start": "npx tsc && node ./bin/www",
            "setup": "npx tsc && node ./build/setup/createTable.js"
          },
      
 * After all the installations run both the servers: 
      1. In the backend folder `npm run setup`  to populate table in dynamo db 
      2. Then run both the servers using `npm run start`
      
      
      
     


