Node.js Homeworks 02-06

# Contacts phonebook API

## Scripts:

- `npm start` - run server in production mode,
- `npm run start:dev` - run server in development mode,
- `npm run lint` - run eslint,
- `npm run lint:fix` - run eslint with auto-fix errors,
- `npm test` - run tests,
- `npm run test:coverage` - run tests with coverage

## AUTHORIZATION REQUEST

### Registration request example

```
POST /api/auth/signup

Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

### Login request example (User`s email should be verified)

```
POST /api/auth/signin

Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

### Logout request example

```
POST /api/auth/signout

Authorization: "Bearer {{token}}"
```

## USERS REQUEST

### Current user request

```
GET api/users/current

Authorization: "Bearer {{token}}"
```

### Update user`s subscription

```
PATCH /api/users

Content-Type: application/json
Authorization: "Bearer {{token}}"
RequestBody: {
  "subscription": "starter"
}
```

### Update user`s avatar

```
PATCH /api/users/avatars

Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: {
  "avatar": file
}
```

### Verification of user`s email

```
GET /api/users/verify/:verifyToken
```

### Resend email verification token

```
POST /api/users/verify

Content-Type: application/json
RequestBody: {
  "email": "example@example.com"
}
```

## Contacts requests

### Get contacts

```
GET /api/contacts

Authorization: "Bearer {{token}}"
```

### Get contact by id

```
GET /api/contacts/:contactId

Authorization: "Bearer {{token}}"
```

### Add new contact

```
POST /api/contacts

Content-Type: application/json
Authorization: "Bearer {{token}}"
RequestBody: {
  "name": "exampleName",
  "email": "example@example.com",
  "phone": "1234567"
  "favorite": {{Boolean}}   //optional
}
```

### Delete contact

```
DELETE /api/contacts/:contactId

Authorization: "Bearer {{token}}"
```

### Update contact information

```
PATCH /api/contacts:contactId

Content-Type: application/json
Authorization: "Bearer {{token}}"
RequestBody: {
  "name": "exampleName",                    // NOTE: "Should contain at least
  "email": "example@example.com",           // one of the following params"
  "phone": "1234567"
  "favorite": {{Boolean}}
}
```

### Update contact favorite status

```
PATCH /api/contacts/:contactId/favorite

Content-Type: application/json
Authorization: "Bearer {{token}}"
RequestBody: {
  "favorite": {{Boolean}}
}
```
