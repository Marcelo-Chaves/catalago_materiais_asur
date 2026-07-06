import api from "./api";

// LISTAR
export async function listarProdutos() {
  const res = await api.get("/produtos");
  return res.data;
}

// CRIAR
export async function criarProduto(formData) {
  const res = await api.post(
    "/produtos",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return res.data;
}

// ATUALIZAR
export async function atualizarProduto(
  id,
  formData
) {
  const res = await api.put(
    `/produtos/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return res.data;
}

// EXCLUIR
export async function excluirProduto(id) {
  const res = await api.delete(
    `/produtos/${id}`
  );

  return res.data;
}