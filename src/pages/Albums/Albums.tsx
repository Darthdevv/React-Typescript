import { useEffect, useRef, useState } from "react";

interface Album {
  userId: number;
  id: number;
  title: string;
}
const Albums = () => {

  const BASE_URL: string = "https://jsonplaceholder.typicode.com/";

  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

        setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/albums`, {signal: abortControllerRef.current?.signal,});
        const albums = (await response.json()) as Album[];
        setAlbums(albums);
      } catch (error: unknown) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAlbums()
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error 👾</div>
  }
  return (
    <div>
      { !error && albums.map(album => {
        return (
          <div key={album.id}>
            <span>{album.id}</span>
            <h3>{album.title}</h3>
          </div>
        );
      })}
    </div>
  )
}

export default Albums