export interface Emprestimo {
    id?: any;
    dataEmprestimo?: string;
    dataDevolucao?: string;
    status: string;
    cliente: any;
    livro: any;
    nomeCliente: string;
    nomeLivro: string;
}