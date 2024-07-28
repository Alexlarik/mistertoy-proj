import { Button, Paper, Typography } from '@mui/material'

export function Home() {
    return (

        <section className="home-page">
            <Typography variant='h4'>
                <Paper elevation={12}>
                    <div>
                        <p>Info 1:</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis deserunt ipsa fugit, eum cum asperiores labore eveniet blanditiis minima recusandae dolores dolore nemo! Architecto quas cupiditate itaque porro tempora obcaecati!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis deserunt ipsa fugit, eum cum asperiores labore eveniet blanditiis minima recusandae dolores dolore nemo! Architecto quas cupiditate itaque porro tempora obcaecati!</p>
                    </div>
                </Paper>
                <Paper elevation={12}>
                    <div>
                        <p>Info 2:</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis deserunt ipsa fugit, eum cum asperiores labore eveniet blanditiis minima recusandae dolores dolore nemo! Architecto quas cupiditate itaque porro tempora obcaecati!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis deserunt ipsa fugit, eum cum asperiores labore eveniet blanditiis minima recusandae dolores dolore nemo! Architecto quas cupiditate itaque porro tempora obcaecati!</p>
                    </div>
                </Paper>


            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Learn More
            </Button>
        </section>


    )
}
