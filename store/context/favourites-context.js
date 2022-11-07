import { createContext, useEffect, useState } from "react";

export const FavouritesContext = createContext({
  ids: [],
  addFavourite: (id) => {},
  removeFavourite: (id) => {},
});

function FavouriteContextProvider({ children }) {
  const [favouriteMealIds, setFavouriteMealIds] = useState([]);
  const addFavourite = (id) => {
    setFavouriteMealIds((prev) => [...prev, id]);
  };

  const removeFavourite = (id) => {
    setFavouriteMealIds((prev) => prev.filter((meal) => meal !== id));
  };

  const value = {
    ids: favouriteMealIds,
    addFavourite: addFavourite,
    removeFavourite: removeFavourite,
  };
  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export default FavouriteContextProvider;
