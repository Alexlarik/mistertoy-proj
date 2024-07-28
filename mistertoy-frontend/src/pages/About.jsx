import { Map } from "../../cmps/Map"
import { Typography, Paper, Button } from "@mui/material"
export function About() {
    return (
        <section className="about-page">
            <Typography variant='h6'>

                <div className="about-page-panel">

                    <h2>Map info</h2>
                    <Paper elevation={12}>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam
                            quo veniam velit dolor reprehenderit, laudantium consequatur neque
                            numquam labore quae. Accusamus libero perferendis ducimus? Alias unde
                            hic quisquam doloremque.
                        </p>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                Learn More
                            </Button>
                    </Paper>

                </div>


            </Typography>

            <Map />
        </section>
    )
}