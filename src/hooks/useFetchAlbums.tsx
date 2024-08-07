import { useEffect, useRef, useState } from "react";

interface Album {
  userId: number;
  id: number;
  title: string;
}

const useFetchAlbums = () => {
  const BASE_URL: string = "https://jsonplaceholder.typicode.com/";

  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await fetch(`${BASE_URL}/albums`, {
          signal: abortControllerRef.current.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const albums = (await response.json()) as Album[];
        setAlbums(albums);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return { albums, loading, error };
};

export default useFetchAlbums;
