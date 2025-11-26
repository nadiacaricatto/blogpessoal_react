import Popup from 'reactjs-popup'
import FormPostagem from '../formpostagem/FormPostagem'

function ModalPostagem() {
    return (
        <>
            <Popup 
                trigger={
                    <button className='bg-linear-to-r from-(--persian-rose-500) 
                                     to-(--persian-rose-600) hover:from-(--persian-rose-600) 
                                     hover:to-(--persian-rose-700) text-white font-bold
                                     border-2 border-white rounded-xl px-6 py-3 
                                     hover:scale-105 transition-all duration-300 shadow-lg
                                     flex items-center gap-2'> 
                        ✨ Nova Postagem 
                    </button>
                } 
                modal 
                contentStyle={{
                    backgroundColor: "white",
                    width: "90%",
                    maxWidth: "50rem",
                    borderRadius: "1.5rem",
                    padding: "2rem",
                    border: `3px solid var(--persian-rose-300)`,
                    maxHeight: "90vh",
                    overflow: "auto"
                }}
            >
                <FormPostagem />
            </Popup>
        </>
    )
}

export default ModalPostagem