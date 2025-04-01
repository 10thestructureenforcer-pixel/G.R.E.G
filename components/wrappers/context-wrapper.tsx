import { createContext, useContext, useState } from "react";

type UserContextType = {
  clientList: any[];
  setClientList: React.Dispatch<React.SetStateAction<any[]>>;
};

const defaultContext: UserContextType = {
  clientList: [],
  setClientList: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [clientList, setClientList] = useState<any[]>([]);

  return (
    <UserContext.Provider value={{ clientList, setClientList }}>
      {children}
    </UserContext.Provider>
  );
}

export function useAppContext() {
  return useContext(UserContext);
}
