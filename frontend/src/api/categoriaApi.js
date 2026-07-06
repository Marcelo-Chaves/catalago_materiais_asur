
import api from "./api";

// LISTAR
export async function listarCategorias() {
  const response = await api.get("/categorias");
  return response.data;
}

// CRIAR
export async function criarCategoria(nome) {
  const response = await api.post(
    "/categorias",
    { nome }
  );

  return response.data;
}

// ATUALIZAR
export async function atualizarCategoria(
  id,
  nome
) {
  const response = await api.put(
    `/categorias/${id}`,
    { nome }
  );

  return response.data;
}

// EXCLUIR
export async function excluirCategoria(id) {
  const response = await api.delete(
    `/categorias/${id}`
  );

  return response.data;
}

