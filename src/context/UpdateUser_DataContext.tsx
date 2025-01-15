import { useContext, createContext } from "react";

// Context Created
type UpdateUser_ContextType = {
  updateUserMetadata: (userId: string | null | undefined, metadata: Record<string, unknown>) => void;
};

export const UpdateUser_DataContext = createContext<UpdateUser_ContextType>({
  updateUserMetadata: () => undefined,
});

// useContext Created
export const useUpdateUser = () => {
  return useContext(UpdateUser_DataContext);
};

// CONTEXT REACT FUNCTION
export function UpdateUserContextProvider(props: React.PropsWithChildren) {
  const updateUserMetadata = async (userId: string | null | undefined, metadata: Record<string, unknown>) => {
    try {
      const token = await getManagementToken();
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_metadata: metadata }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Erro na requisição PATCH:", error);
        throw new Error(error.message || "Erro desconhecido ao atualizar metadata.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao atualizar o user_metadata:", error);
      throw error;
    }
  };

  const getManagementToken = async () => {
    const data = {
      client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/`,
      grant_type: "client_credentials",
    };

    try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Se a resposta não for ok, lançamos o erro
        const error = await response.json();
        console.error("Erro ao obter o token:", error);
        throw new Error(error.message || "Erro desconhecido ao obter o token.");
      }

      // Se a resposta for bem-sucedida, obter o token
      const result = await response.json();

      // Verifica se o access_token foi retornado
      if (!result.access_token) {
        throw new Error("Token não encontrado na resposta.");
      }

      return result.access_token;
    } catch (error) {
      console.error("Erro ao obter o token da API:", error);
      throw error;
    }
  };

  return (
    <UpdateUser_DataContext.Provider value={{ updateUserMetadata }}>{props.children}</UpdateUser_DataContext.Provider>
  );
}
