import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// 1. Importe o Axios
import axios from 'axios';

// 2. Configuração Global da API Apontando para o meu Spring Boot
axios.defaults.baseURL = 'http://localhost:8080';

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
