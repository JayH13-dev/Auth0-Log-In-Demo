let auth0Client;

const $ = (id) => document.getElementById(id);

async function init() {
  try {
    const config = await fetch("auth_config.json").then((r) => r.json());

    if (!config.domain || config.domain.startsWith("YOUR_")) {
      throw new Error("Fill in auth_config.json with your Auth0 domain and client ID.");
    }

    auth0Client = await auth0.createAuth0Client({
      domain: config.domain,
      clientId: config.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
      cacheLocation: "localstorage", // keeps you logged in across page refreshes
    });

    // Returning from the Auth0 Universal Login page?
    const params = new URLSearchParams(window.location.search);
    if (params.has("code") && params.has("state")) {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    await render();
  } catch (err) {
    showError(err);
  }
}

async function render() {
  const isAuthenticated = await auth0Client.isAuthenticated();

  $("btn-login").hidden = isAuthenticated;
  $("btn-logout").hidden = !isAuthenticated;
  $("profile").hidden = !isAuthenticated;
  $("claims-wrap").hidden = !isAuthenticated;

  if (isAuthenticated) {
    const user = await auth0Client.getUser();
    $("status").textContent = "You are logged in.";
    $("name").textContent = user.name || user.nickname || "";
    $("email").textContent = user.email || "";
    $("avatar").src = user.picture || "";
    $("claims").textContent = JSON.stringify(user, null, 2);
  } else {
    $("status").textContent = "You are not logged in.";
  }
}

function showError(err) {
  console.error(err);
  $("status").textContent = "";
  $("error").hidden = false;
  $("error").textContent = err.message || String(err);
}

$("btn-login").addEventListener("click", () => {
  auth0Client.loginWithRedirect().catch(showError);
});

$("btn-logout").addEventListener("click", () => {
  auth0Client.logout({
    logoutParams: { returnTo: window.location.origin },
  });
});

init();
