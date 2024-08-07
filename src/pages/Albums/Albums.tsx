import useFetchAlbums from "../../hooks/useFetchAlbums";

const Albums = () => {

  const { albums, loading, error } = useFetchAlbums();

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.log(error);
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