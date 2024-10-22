const API_BASE_URL = "https://panda-market-api.vercel.app";

async function fetchApi(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("서버에서 오류 응답을 받았습니다.");
    }
    return await response.json();
  } catch (error) {
    console.error("에러 발생:", error);
    throw new Error(error.message || "데이터를 불러오는데 실패했습니다.");
  }
}

export async function getProducts({
  page = "",
  pageSize = "",
  orderBy = "",
  keyword = "",
}) {
  const params = new URLSearchParams({ page, pageSize, orderBy, keyword });
  const url = `${API_BASE_URL}/products?${params}`;

  return fetchApi(url);
}

export async function getProductsById(productId) {
  const url = `${API_BASE_URL}/products/${productId}`;

  return fetchApi(url);
}

export async function getCommentsById(productId, { limit = "" }) {
  const params = new URLSearchParams({ limit });
  const url = `${API_BASE_URL}/products/${productId}/comments?${params}`;

  return fetchApi(url);
}

export async function updateCommentsById(commentId, { content }) {
  const url = `${API_BASE_URL}/comments/${commentId}`;
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  };

  return fetchApi(url, options);
}
