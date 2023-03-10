import "./modal-simple.scss"

interface props {
    body: string,
    buttons: btnFunc[]
    title: string,
    funcExit: () => void
}

interface btnFunc {
    color: "primary" | "danger" | "secundary"
    handler: () => void
    label: string
}

export const ModalSimple = ({title, body, buttons, funcExit}: props) => {
    return (
        <>
            <div className="modal-container">
                <div className="modal-div-top">
                    <h2 className="title-modal">{title}</h2>

                    <button className="btn-exit-modal" onClick={funcExit}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="modal-div-body">
                    <p className="text-modal">{body}</p>
                </div>

                <div className="modal-div-footer">
                    {
                        buttons.map(({ color, handler, label }, index) => 
                            <button
                                key={index+"BTN-MODAL"}
                                className={`btn-modal ${
                                      color === "primary" ? "primary"
                                    : color === "secundary" ? "secundary"
                                    : color === "danger" ? "danger" : null
                            }`}
                                onClick={handler}
                            >
                                {label}
                            </button>
                        )
                    }
                </div>
            </div>

            <div className="black-screen"/>
        </>
    )
}