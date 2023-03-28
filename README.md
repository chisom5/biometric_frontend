# Frontend File Upload for Biometrioearth

This is a file uploader execrise,  built with Reactjs and Apollo Client for Graphql API integration. 


## Requirements

To run this project, you'll need to have installed:

 - nodejs
 - npm or yarn
    

### Run the project

** **Note**: 
   * Ensure that you have the backend project clone from [this](https://github.com/biometrioearth/file-upload-backend) and the 
   * Docker setup is complete and running. inorder to generate the graphql endpoint (http://localhost:<TEST_APP_PORT>/graphql/)
    

## Step 1

Before anything you'll need to have the codebase on your local machine, by clicking on the `<> Code` button to show the available options. 

 * Git clone : using the `git clone` command. or 
 * Download Zip: To donwload it as a zip file, then extract on your local machine.

## Step 2

Once you have the project on your machine, you can use `yarn start` or `npm start` command. to Launch it, and it can be access via:

- Frontend: 
   * http://localhost:3000/

   * where 3000 is my react port.


#### Features

 -  Only  registered  users  can  upload  files.

 <!-- -  The  users  must  be  able  to  search  for  files  by  name,  mime  type  or  fields  in  the  file_metadata. -->
 - Only registered users can view the list of files. 

 - Can click on the file cell to preview Images uploaded.

 - Only  a  staff  user  or  a  superuser  can  delete  files.
 
 - Only  a  staff  user  or  a  superuser  can  create  new  users
 
 - Only  a  staff  user  or  a  superuser  can  delete  users.

 - Pagination features done for both users and files.


 ##### Technology & Libraries Used

 - Reactjs 

 - Apollo Client (for Graphql integration.)

 - Styled-components

 - Styled-system etc. 

 check out the package.json file for your reference.
