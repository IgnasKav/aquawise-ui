---
created: 2024-01-11T21:59:05.124Z
updated: 2024-01-14T18:58:02.366Z
assigned: ""
progress: 0
tags: []
started: 2024-01-14T18:36:51.502Z
completed: 2024-01-14T18:58:02.366Z
---

# Fix quantity field

Quantity field is still treated as string, even though it's a number. Add type parameter to NumberInput.tsx. Type parameter should be optional and default to "float". Type parameter should accept "int" or "float".
