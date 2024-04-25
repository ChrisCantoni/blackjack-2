import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

function WinnerBanner({closeModal, winner, dealCards}) {

    return (
        <div className="winner-container" onClick={(e) => {
            if (e.target.className === 'winner-container') closeModal();
        }}> 
            <div className="winner">
            <Button sx={{color: 'white'}} className="close-icon" onClick={closeModal}><CloseIcon /></Button>
        <h1>{winner}</h1>
        <Button variant="contained" onClick={dealCards}>Play Again?</Button>
        
        </div>
        </div>
    )
}

export default WinnerBanner;