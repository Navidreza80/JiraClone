// Function for saving and setting cookies
export const setClientCookie = (name: string, value: string, eMin: number) => {
  let expires = "";
  if (eMin) {
    const date = new Date();
    date.setTime(date.getTime() + eMin * 60 * 1000);
    expires = `; expires = ${date.toUTCString()} `;
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

// Function for reading and getting cookies
export function getClientCookie(name: string) {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const ca = typeof window != "undefined" && document.cookie.split(";");
  const cookieValue = ca
    .map((c) => c.trim())
    .find((c) => c.indexOf(nameEQ) === 0);
  if (cookieValue) {
    return cookieValue.substring(nameEQ.length, cookieValue.length);
  }
  return null;
}

// Function for deleting cookies
export const deleteClientCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Max-Age=0; path=/`;
};
