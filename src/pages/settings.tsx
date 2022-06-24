import { Container } from "@mui/system";
import Header from "../components/Header";
import TopBar from "../components/TopBar";



const Settings = () => {
    return (
        <>
            <TopBar
                back
            />
            <Container sx={{ height: "100vh" }}>
                <Header>
                    Setari
                </Header>
            </Container>
        </>

    )
}

export default Settings;