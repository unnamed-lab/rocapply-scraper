export const formFetch = async (
  url: string,
  countryValue: string,
  universityValue: string | undefined = undefined,
  timeout: number = 10000 // default timeout of 10 seconds
) => {
  const formData = new FormData();
  formData.append("country", countryValue);

  if (universityValue) formData.append("university", universityValue);

  const controller = new AbortController();
  const signal = controller.signal;

  const fetchTimeout = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      signal,
    });

    clearTimeout(fetchTimeout);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
};
