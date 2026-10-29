const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// IMPORTANT: Accept OBJECT not 3 separate params!
export async function createCategory({ icon, title, description }) {
  try {
     // 🔹 1) token localStorage se lo
    // yahan wohi key lagani hai jo tum login ke time use karte ho
    // example: "authToken", "adminToken", "authCookie", etc.
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("authToken") // <-- is KEY ko apne hisaab se change karo
        : null;

    // 🔹 2) headers build karo
       const headers = {
      "Content-Type": "application/json",
    }; 
    
     if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // 🔹 3) request bhejo
    const response = await fetch(`${apiBaseUrl}categories`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        icon,        // static URL
        title,       // name
        description, // text
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    console.log("📩 createCategory RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data?.message || `Create failed - ${response.status}`);
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    console.error("❌ createCategory error:", err);
    throw err;
  }
}



export async function getCategories({ page = 1, limit = 10 } = {}) {
  try {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("authToken") // <-- is KEY ko apne hisaab se change karo
        : null;

    const headers = {}  
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }


    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

   
    const response = await fetch(`${apiBaseUrl}categories?${params.toString()}`, {
      method: "GET",
      headers,
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    console.log("📩 getCategories RESPONSE:", data);
    
    if (!response.ok) {
      throw new Error(data?.message || `Get categories failed - ${response.status}`);
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    console.error("❌ createCategory error:", err);
    throw err;
  }
}
