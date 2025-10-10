# Authentication

This API uses **cookie-based JSON Web Token (JWT)** authentication to secure all protected endpoints. It employs a **two-token system** — an **Access Token** and a **Refresh Token** — both managed via **HttpOnly cookies** for enhanced security.

## Access Token

- **Usage:** Required to access protected routes within the API.
- **Storage:** Sent to the client and stored as an `HttpOnly` cookie named `accessToken`.
- **Transmission:** Automatically included in every request by the browser (no manual header handling required if cookies are enabled).
- **Format:** Standard JWT.
- **Lifetime:** Short-lived (e.g., 15 minutes). Once expired, requests to protected routes will return `401 Unauthorized`.
- **Obtaining:** Issued upon successful registration (`/auth/register`) or login (`/auth/login`).
- **Renewal:** Automatically renewed using the Refresh Token through the `/auth/refresh-token` endpoint.

## Refresh Token

- **Usage:** Used to generate a new Access Token when it expires.
- **Storage:** Sent to the client as an `HttpOnly`, `Secure` (in production), `SameSite=Strict` cookie named `refreshToken`.
- **Transmission:** Automatically included in the request by the browser when calling `/auth/refresh-token`.
- **Format:** Standard JWT.
- **Lifetime:** Longer-lived (e.g., 7 days).
- **Obtaining:** Set as a cookie upon successful registration or login.
- **Invalidation:** Deleted on the server and cleared from cookies upon logout (`/auth/logout`).

## Authentication Flow

1. **Register or Login**
   - Call `POST /auth/register` or `POST /auth/login` with valid credentials.
   - On success:
     - `accessToken` and `refreshToken` are set as **HttpOnly cookies**.
     - You can now access protected routes without manually managing tokens.

2. **Access Protected Endpoints**
   - Simply make API requests — cookies are automatically sent with requests.
   - If the `accessToken` is valid, the request succeeds.

3. **Access Token Expired**
   - When the `accessToken` expires, requests return `401 Unauthorized`.
   - Call `POST /auth/refresh-token`.
     - The browser automatically sends the `refreshToken` cookie.
     - A new `accessToken` (and optionally a new `refreshToken`) is issued and stored in cookies.
   - Retry your original request.

4. **Refresh Token Expired or Invalid**
   - If `/auth/refresh-token` returns `401 Unauthorized`, the session has expired.
   - The user must log in again via `/auth/login`.

5. **Logout**
   - Call `POST /auth/logout`.
   - Both `accessToken` and `refreshToken` cookies are cleared on the client and invalidated on the server, ending the session.
