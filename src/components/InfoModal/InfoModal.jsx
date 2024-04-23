import Accordion from '../Accordion/Accordion'

function InfoModal({closeModal}) {

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === 'modal-container') closeModal();
        }}>
            <div className="modal">
                <h3>How to Play</h3>
                <Accordion/>
            </div>
        </div>
    )
}

export default InfoModal;