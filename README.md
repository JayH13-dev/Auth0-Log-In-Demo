# Auth0 Login Demo

A minimal single-page JavaScript app with Auth0 login. No build step and no Node.js needed.

## 1. Set up Auth0 (free tier)

1. Sign up at https://auth0.com/signup (the free plan is fine).
2. In the dashboard go to **Applications → Applications → Create Application**.
3. Name it, choose **Single Page Web Applications**, and click **Create**.
4. Open the **Settings** tab and set these fields to `http://localhost:3000`:
   - **Allowed Callback URLs**
   - **Allowed Logout URLs**
   - **Allowed Web Origins**
5. Click **Save Changes**.
6. Copy the **Domain** and **Client ID** from the top of the Settings tab.

## 2. Configure the app

Put those values in `auth_config.json`:

```json
{
  "domain": "dev-abc123.us.auth0.com",
  "clientId": "AbCdEf123..."
}
```

These values are safe to ship to the browser. A SPA has no client secret.

## 3. Run it

```sh
python3 -m http.server 3000
```

Open http://localhost:3000 and click **Log in**.

## Files

- `index.html`: the page
- `app.js`: Auth0 client setup, login/logout, and user profile display
- `auth_config.json`: your tenant domain and client ID
- `style.css`: styling
