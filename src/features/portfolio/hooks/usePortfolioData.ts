import { useGetApiV1PortfolioPerfil, useGetApiV1PortfolioProjetos } from '../../../shared/api/generated/default/default'

export function usePortfolioData() {
  const { data: perfilResponse, isLoading: perfilLoading } = useGetApiV1PortfolioPerfil()
  const { data: projetosResponse, isLoading: projetosLoading } = useGetApiV1PortfolioProjetos()

  return {
    perfil: perfilResponse?.data,
    projetos: projetosResponse?.data ?? [],
    isLoading: perfilLoading || projetosLoading,
  }
}
