import {Card, CardContent, Typography } from '@mui/material';

function EmptyTable() {

    return (
        <>
            <div className="cardDisplay">
                <Card sx={{ width: 120, height: 175, margin: 2, backgroundColor: 'darkgreen', boxShadow: 'none'}}>
                    <CardContent>
                        <Typography variant="h3"> 
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className="cardDisplay">
                <Card sx={{ width: 120, height: 175, margin: 2, backgroundColor: 'darkgreen', boxShadow: 'none'}}>
                    <CardContent>
                        <Typography variant="h3"> 
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default EmptyTable;