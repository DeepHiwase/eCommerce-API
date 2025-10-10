# Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request. Errors generally return a JSON body with `code` and `message` fields. Validation errors include an additional `errors` object.

## Common Status Codes & Error Codes

| Status Code                 | `code` Value(s)       | Meaning                                                                                                  |
| :-------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------- |
| `200 OK`                    | N/A                   | Request successful.                                                                                      |
| `201 Created`               | N/A                   | Resource created successfully.                                                                           |
| `204 No Content`            | N/A                   | Request successful, no response body needed (e.g., successful deletion).                                 |
| `400 Bad Request`           | `ValidationError`     | Input validation failed (e.g., missing required field, invalid format). See `errors` object for details. |
| `400 Bad Request`           | `BadRequest`          | General bad request (e.g., trying to like an already liked blog).                                        |
| `401 Unauthorized`          | `AuthenticationError` | Missing, invalid, or expired `accessToken` or `refreshToken`. Check `message` for specifics.             |
| `403 Forbidden`             | `AuthorizationError`  | User lacks permission (role) for the action, or attempting unauthorized admin registration.              |
| `404 Not Found`             | `NotFound`            | The requested resource (user, blog, comment) could not be found.                                         |
| `409 Conflict`              | `Conflict`            | The data with same values                                                                                |
| `413 Payload Too Large`     | `ValidationError`     | Uploaded file exceeds the size limit (2MB for blog banners).                                             |
| `422 UNPROCESSABLE_CONTENT` | N/A                   | Can't do a process or action on something/content                                                        |
| `429 Too Many Requests`     | N/A                   | Rate limit exceeded (see Rate Limiting guide).                                                           |
| `500 Internal Server Error` | `ServerError`         | An unexpected error occurred on the server. Contact support if this persists.                            |

## Error Response Format

**General Error:**

```json
{
	"code": "NotFound",
	"message": "Product not found"
}
```

**Validation Error (ZOD validation):**

```json
{
	"message": "[\n  {\n    \"origin\": \"string\",\n    \"code\": \"invalid_format\",\n    \"format\": \"email\",\n    \"pattern\": \"/^(?!\\\\.)(?!.*\\\\.\\\\.)([A-Za-z0-9_'+\\\\-\\\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\\\-]*\\\\.)+[A-Za-z]{2,}$/\",\n    \"path\": [\n      \"email\"\n    ],\n    \"message\": \"Invalid email address\"\n  }\n]",
	"errors": [
		{
			"path": "email",
			"message": "Invalid email address"
		}
	]
}
```
