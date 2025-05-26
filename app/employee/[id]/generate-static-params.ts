/*export async function generateStaticParams() {
  try {
    const response = await fetch("https://dummyjson.com/users?limit=30");
    const data = await response.json();

    return data.users.map((user: { id: number }) => ({
      id: String(user.id),
    }));
  } catch (error) {
    // fallback to first 10 users if fetch fails
    return Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
    }));
  }
}
  */
