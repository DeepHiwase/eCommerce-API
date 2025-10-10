# Introduction

## DOCUMENTATION & SWAGGER API

Welcome to the E-Commerce API documentation!

## Base URL

All API endpoints are relative to the following base URL: /api/v1

For example, the user registration endpoint is `/api/v1/auth/register`.

## Overview

- **API Version:** 1.0.0
- **Authentication:** Cookie base auth with access token and refresh token.
- **Authorization:** Role-based access control ('admin', 'customer', 'retailer'). Specific roles are required for certain endpoints.
- **Rate Limiting:** Applied globally (60 requests per minute per IP). Exceeding the limit returns a `429 Too Many Requests` error.
- **Input Validation:** Uses `zod`. Invalid requests return detailed `400 Bad Request` errors.
- **Content Format:** Primarily JSON (`application/json`). File uploads use `multipart/form-data`.
