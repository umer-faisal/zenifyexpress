
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

 export async function signup(name, email, password, passwordConfirm) {

    try {
     const response = await fetch(`${apiBaseUrl}users/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        passwordConfirm,
      }),
    });

    let data;

    // FIRST → Try to parse response body
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    console.log("📩 RESPONSE:", data);

    // CHECK ERROR RESPONSE
    if (!response.ok) {
      throw new Error(data?.message || `Signup failed - ${response.status}`);
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    console.error("🔥 SIGNUP ERROR:", err);
    throw err; // ⚠ very important
  }
 }

 export async function login(email, password) {
   try {
     const response = await fetch(`${apiBaseUrl}users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    let data;

    // FIRST → Try to parse response body
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    console.log("📩 RESPONSE:", data);

    // CHECK ERROR RESPONSE
    if (!response.ok) {
      throw new Error(data?.message || `Login failed - ${response.status}`);
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    console.error("🔥 LOGIN ERROR:", err);
    throw err; // ⚠ very important
  }
 }

 