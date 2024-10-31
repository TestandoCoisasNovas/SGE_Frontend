export default function ErrorPage() {
  return (
    <div className="flex flex-col gap-2 text-3xl select-none font-bold">
      <div className="flex flex-col items-center justify-center animate-pulse">
        <h1 className="text-9xl tracking-widest">404</h1>
        <div className="bg-tertiary px-2 text-sm rounded rotate-12 absolute">
          <h1>OCORREU UM ERRO AO CARREGAR</h1>
        </div>
      </div>
      <h1 className="text-center text-xl response:text-2xl font-normal select-none">
        A página que você tentou acessar <b>NÃO EXISTE!</b>
      </h1>
      <h1 className="text-center font-normal text-xl response:text-2xl select-none">
        Selecione outra página no menu a esquerda.
      </h1>
    </div>
  );
}
