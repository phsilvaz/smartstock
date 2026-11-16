import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Package, ArrowRightLeft, FileText, LayoutDashboard, LogOut, Plus, Trash2, AlertCircle 
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Monitor Dell 24"', categoria: 'Eletrônicos', quantidade: 15, preco: 850.00 },
    { id: 2, nome: 'Teclado Mecânico', categoria: 'Acessórios', quantidade: 4, preco: 250.00 },
    { id: 3, nome: 'Cadeira Ergonomica', categoria: 'Móveis', quantidade: 12, preco: 1200.00 },
  ]);

  const [movimentacoes, setMovimentacoes] = useState([
    { id: 1, tipo: 'Entrada', produto: 'Monitor Dell 24"', qtde: 10, data: '2023-10-01' },
    { id: 2, tipo: 'Saída', produto: 'Teclado Mecânico', qtde: 2, data: '2023-10-05' },
  ]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center mb-6">
            <Package className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">SmartStock</h2>
          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input type="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Acessar Sistema
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    const totalProdutos = produtos.length;
    const totalEstoque = produtos.reduce((acc, curr) => acc + curr.quantidade, 0);
    const estoqueBaixo = produtos.filter(p => p.quantidade < 5).length;

    const chartData = produtos.map(p => ({
      name: p.nome.substring(0, 10) + '...',
      Estoque: p.quantidade
    }));

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard de Visão Geral</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Produtos Cadastrados</p>
              <p className="text-2xl font-bold text-gray-800">{totalProdutos}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total em Estoque</p>
              <p className="text-2xl font-bold text-gray-800">{totalEstoque}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Estoque Baixo</p>
              <p className="text-2xl font-bold text-red-600">{estoqueBaixo}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Nível de Estoque por Produto</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="Estoque" fill="#1e40af" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  const renderProdutos = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestão de Produtos</h2>
        <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-800">
          <Plus size={18} className="mr-2" /> Novo Produto
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estoque</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {produtos.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{p.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.categoria}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.quantidade < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {p.quantidade} un
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-red-600 hover:text-red-900 ml-4"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMovimentacoes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Movimentação de Estoque</h2>
        <div className="space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Registrar Entrada</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Registrar Saída</button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantidade</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {movimentacoes.map((m) => (
              <tr key={m.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{m.data}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`font-medium ${m.tipo === 'Entrada' ? 'text-green-600' : 'text-red-600'}`}>{m.tipo}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{m.produto}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{m.qtde} un</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRelatorios = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Relatórios Gerenciais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition">
          <div className="flex items-center mb-4">
            <FileText className="text-primary mr-3" size={24} />
            <h3 className="text-lg font-semibold text-gray-700">Inventário Completo</h3>
          </div>
          <p className="text-sm text-gray-500">Exporte a lista de todos os produtos cadastrados e seus valores em estoque.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition">
          <div className="flex items-center mb-4">
            <AlertCircle className="text-red-500 mr-3" size={24} />
            <h3 className="text-lg font-semibold text-gray-700">Produtos com Estoque Baixo</h3>
          </div>
          <p className="text-sm text-gray-500">Visualize os itens que atingiram a quantidade mínima de segurança.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Package className="h-6 w-6 mr-2 text-blue-400" />
          <span className="text-lg font-bold">SmartStock</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button onClick={() => setCurrentView('dashboard')} className={`w-full flex items-center px-4 py-3 rounded-md transition ${currentView === 'dashboard' ? 'bg-primary text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <LayoutDashboard size={20} className="mr-3" /> Dashboard
          </button>
          <button onClick={() => setCurrentView('produtos')} className={`w-full flex items-center px-4 py-3 rounded-md transition ${currentView === 'produtos' ? 'bg-primary text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <Package size={20} className="mr-3" /> Produtos
          </button>
          <button onClick={() => setCurrentView('movimentacoes')} className={`w-full flex items-center px-4 py-3 rounded-md transition ${currentView === 'movimentacoes' ? 'bg-primary text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <ArrowRightLeft size={20} className="mr-3" /> Movimentação
          </button>
          <button onClick={() => setCurrentView('relatorios')} className={`w-full flex items-center px-4 py-3 rounded-md transition ${currentView === 'relatorios' ? 'bg-primary text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <FileText size={20} className="mr-3" /> Relatórios
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center px-4 py-2 text-sm text-slate-400 hover:text-white transition">
            <LogOut size={18} className="mr-2" /> Sair do Sistema
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'produtos' && renderProdutos()}
        {currentView === 'movimentacoes' && renderMovimentacoes()}
        {currentView === 'relatorios' && renderRelatorios()}
      </main>
    </div>
  );
}