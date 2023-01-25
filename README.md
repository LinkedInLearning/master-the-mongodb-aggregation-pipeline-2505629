# Master the MongoDB Aggregation Pipeline
This is the repository for the LinkedIn Learning course Master the MongoDB Aggregation Pipeline. The full course is available from [LinkedIn Learning][lil-course-url].

![Master the MongoDB Aggregation Pipeline][lil-thumbnail-url] 

The MongoDB Aggregation Framework allows developers to manipulate and transform data stored in a MongoDB database to fit almost any use case. The aggregation pipeline consists of a series of user-defined stages that manipulate data to produce a final result. The aggregation framework is a very powerful, but also complex tool. In this course, instructor and full-stack developer Ado Kukic explores advanced data analysis and manipulation topics in MongoDB. Ado shows you how to properly use the aggregation framework, highlighting potential use cases and best practices, and shares tips and tricks to help you get even more value from your MongoDB databases.

## Instructions

This repository has branches for each of the videos in the course. You can use
the branch pop up menu in github to switch to a specific branch and take a look
at the course at that stage, or you can add `/tree/BRANCH_NAME` to the URL to go
to the branch you want to access.

## Branches

The branches are structured to correspond to the videos in the course. The
naming convention is `CHAPTER#_MOVIE#`. As an example, the branch named `02_03`
corresponds to the second chapter and the third video in that chapter. Some
branches will have a beginning and an end state. These are marked with the
letters `b` for "beginning" and `e` for "end". The `b` branch contains the code
as it is at the beginning of the movie. The `e` branch contains the code as it
is at the end of the movie. The `main` branch holds the final state of the code
when in the course.

When switching from one exercise files branch to the next after making changes
to the files, you may get a message like this:

    error: Your local changes to the following files would be overwritten by checkout:        [files]
    Please commit your changes or stash them before you switch branches.
    Aborting

To resolve this issue: Add changes to git using this command: git add . Commit
changes using this command: git commit -m "some message"

## Installing

1. To use these exercise files, you must have the following installed:
   - [Node.js and NPM](https://nodejs.org/en/)
   - [MongoDB Compass](https://www.mongodb.com/products/compass)
   - An instance of MongoDB running locally or on
     [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Clone this repository into your local machine using the terminal (Mac), CMD
   (Windows), or a GUI tool like SourceTree.
3. Copy the `.env.example` file and name it `.env`.
4. Replace `{YOUR-MONGODB-URI}` in the `.env` file with your MongoDB Connection
   String.
5. Run `npm install` to install the required `mongodb` and `dotenv`
   dependencies.

[### Instructor

Ado Kukic 
                            


                            

Check out my other courses on [LinkedIn Learning](https://www.linkedin.com/learning/instructors/ado-kukic).

[lil-course-url]: https://www.linkedin.com/learning/master-the-mongodb-aggregation-pipeline?dApp=59033956
[lil-thumbnail-url]: https://media.licdn.com/dms/image/C560DAQGafKcmzWL4vw/learning-public-crop_675_1200/0/1671740249495?e=2147483647&v=beta&t=Gy5XDxb9-IirerdaBNfhFPr1Hc5XB7jNsYn3FXOHpzo
