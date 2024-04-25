

function WinnerBanner({closeModal, winner}) {

    return (
        <div className="winner-container" onClick={(e) => {
            if (e.target.className === 'winner-container') closeModal();
        }}>
            <div className="winner">
        <h2>{winner}</h2>
        </div>
        </div>
    )
}

export default WinnerBanner;