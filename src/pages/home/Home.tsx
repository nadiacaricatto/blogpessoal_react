function Home() {
    return (
        <div
            className="bg-gradient-to-br from-[var(--persian-rose-200)] via-[var(--persian-rose-400)] to-[var(--persian-rose-600)] flex justify-center"
        >
            <div
                className="container grid grid-cols-2 text-white"
            >
                <div
                    className="flex flex-col gap-4 items-center justify-center py-4"
                >
                    <h2
                        className="text-5xl font-bold"
                    >Seja Bem Vinde!</h2>
                    <p
                        className="text-xl"
                    > Expresse aqui seus pensamentos e opinões :): </p>
                    <div
                        className="flex justify-around gap-4"    
                    >
                    <div
                        className="bg-gradient-to-br from-[var(--persian-rose-200)] via-[var(--persian-rose-400)] to-[var(--persian-rose-600)] hover:from-[var(--persian-rose-700)] hover:to-[var(--persian-rose-900)] text-white font-bold py-2 px-4 rounded-xl transition-all"
                    >
                        Nova Postagem
                    </div>
                    </div>
                </div>
                <div
                    className="flex justify-center"
                >
                    <img
                        src=""
                        alt="Imagem da Página home"
                        className="w-2/3"
                    />
                </div>
            </div>
        </div>
    )
}
export default Home