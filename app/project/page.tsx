export default function Project() {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="rounded-md p-5 w-full h-fit bg-zinc-900">
        <div className="text-left flex flex-col ">
          <span className="text-xl text-gray-200">Nome do projeto</span>
          <div className="w-full flex flex-row gap-5 text-gray-500">
            <span className="text-xs">10 commits</span>
            <span className="text-xs">1 merge</span>
            <span className="text-xs">3 dias atrás</span>
          </div>
          <a
            href="github.com/projetomastar"
            className="text-right text-sm text-gray-500 italic"
          >
            www.github.com/projetomastar
          </a>
        </div>
        <div className="text-left flex flex-col mt-5">
          <span className="text-xl text-gray-200">Funcionalidade</span>
          <span className="text-md text-gray-400">
            Pedir aqui a descrição do projeto, feita pela AI
          </span>
        </div>
      </div>
    </div>
  );
}
