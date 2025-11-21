import { useEffect, useState } from "react";

export default function Footer() {
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    async function fetchVisitorCount() {
      try {
        const res = await fetch("/api/visitorCount");
        const data = await res.json();
        setVisitors(data.count);
      } catch (err) {
        console.error("Error fetching visitor count:", err);
      }
    }
    fetchVisitorCount();
  }, []);

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-4 w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center">
        <div className="text-center mb-1">
          © 2025 Created With ❤️ By @iamvisshu
        </div>
        <div className="text-sm font-semibold text-center">
          {visitors !== null ? (
            <>
              Total visitors count:{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                {visitors.toLocaleString()}
              </span>
            </>
          ) : (
            "Loading visitor count..."
          )}
        </div>
      </div>
    </footer>
  );
}
