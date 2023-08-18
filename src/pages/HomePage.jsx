import React from "react";
import ListItem from "../components/ListItem";
import SearchBox from "../components/SearchBox";
import { useSearchParams } from "react-router-dom";
import { getActiveNotes } from "../utils/api";
import { searchNotes } from "../utils/local-data";
import LoadingScreen from "../components/LoadingScreen";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const titleParam = searchParams.get("title"); // get keyword(query) from url for searchBar (synchronizaiton)

  const [query, setQuery] = React.useState(titleParam || "");
  const [notes, setNotes] = React.useState([]);
  const [initializing, setInitializing] = React.useState(true);

  function onSearchHandler(newQuery) {
    setQuery(newQuery);
    setSearchParams({ title: newQuery }); // get keyword(query) from searchBar for url (synchronizaiton)
  }

  React.useEffect(() => {
    getActiveNotes()
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
        <LoadingScreen />
      ) : (
        <>
          <ListItem notes={searchNotes(query, notes)} isHome={true} />
          <SearchBox onSearchHandler={onSearchHandler} defaultKey={query} />
        </>
      )}
    </main>
  );
}

export default HomePageWrapper;
