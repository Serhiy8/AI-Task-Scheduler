npm i - installation dependencies.
npm run dev - start server.

Methods for server works with database(supabase).
I work with postman

(post method) http://localhost:3000/api/users/register - user registration;
(post method) http://localhost:3000/api/users/login - user login;
(post method) http://localhost:3000/api/users/logout - user logout;
(get method) http://localhost:3000/api/users/current - get current user, refresh page;
(get method) http://localhost:3000/api/tasks - get all tasks for user (after registration or sign In);
(post method) http://localhost:3000/api/tasks - add new task;