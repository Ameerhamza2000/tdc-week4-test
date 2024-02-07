TASKS APP

In this CRUD app you can see everyone's created tasks but can't get their id's.When a user logs in and can see his created tasks with their id's. Can create a new task,update,delete and get specific one.


/* 
 login =            /api/user/login       (post)
 signup=            /api/user/signup      (post)

 alltasks     =      /api/task/            ?page=1&limit=5  (get)
 user's tasks =      /api/task/user        ?page=1&limit=5  (get)
 create task  =      /api/task/            (post)
 update       =      /api/task/:id         (put)
 specific task=      /api/task/:id         (get)
 delete task  =      /api/task/:id         (delete)
*/