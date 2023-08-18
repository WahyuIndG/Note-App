import React from "react";
import { searchNotes } from "../utils/local-data";
import { getArchivedNotes } from "../utils/api";
import ListItem from "../components/ListItem";
import { useSearchParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import LoadingScreen from "../components/LoadingScreen";

function ArchivePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const titleParams = searchParams.get("title");

  const [query, setQuery] = React.useState(titleParams || "");
  const [initializing, setInitializing] = React.useState(true);
  const [notes, setNotes] = React.useState([]);

  function onSearchHandler(newQuery) {
    setQuery(newQuery);
    setSearchParams({ title: newQuery });
  }

  React.useEffect(() => {
    getArchivedNotes()
      .then(({ data }) => {
        setNotes(data);
        setInitializing(false);
      })
      .catch(() => {
        alert("Failed to Get Notes from API !");
      });
  }, []);

  return (
    <main>
      {initializing ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <>
          <ListItem notes={searchNotes(query, notes)} isHome={false} />
          <SearchBox onSearchHandler={onSearchHandler} defaultKey={query} />
        </>
      )}
    </main>
  );
}

export default ArchivePageWrapper;
