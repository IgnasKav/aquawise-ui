---
created: 2024-01-14T21:48:17.123Z
updated: 2024-02-07T21:08:05.166Z
assigned: ""
progress: 0
tags: []
started: 2024-01-17T00:00:00.000Z
completed: 2024-02-07T21:08:05.166Z
---

# Fix auth dialogs

For some reason login dialog does not open

## Sub-tasks

- [x] fix login dialog
- [x] fix company register dialog
- [x] fix admin register page
- [x] in company register form on success- display toast
- [x] move company register to a new page and remove dialog view switching
- [x] move authmodal to app directory
- [x] refactor user register form, don't register user using useAuth, create mutationFn instead which would save user. Also this endpoint should be used for saving admins and simple users.
