import { Grid, Button } from "@mui/material";
import { categories } from "../lib/categories";


const Categories = () => {
    return (
        <Grid
            container
            direction="row"
            spacing={1}
            sx={{
                marginLeft: theme => `-${theme.spacing(1)}!important`,
                marginTop: theme => `-${theme.spacing(1)}!important`
            }}
        >
            {categories.map((category) => (
                <Grid
                    key={category.id}
                    item
                    xs={6}
                    sm={4}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                            justifyContent: "flex-start"
                        }}
                    >
                        {category.name}
                    </Button>
                </Grid>
            ))}
        </Grid>
    )
}

export default Categories;