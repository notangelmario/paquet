import { Head } from "$fresh/runtime.ts";
import Container from "@/components/Container.tsx";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Icon from "@/components/Icon.tsx";
import LoginButtons from "@/islands/LoginButtons.tsx";


export default function Login() {
    return (
        <>
            <Head>
                <title>Login &middot; Paquet</title>
            </Head>
            <Navbar 
                back
            />
            <Container class="flex flex-row flex-wrap gap-4">
                <div class="w-full md:flex-1">
                    <Stack>
                        <Header>
                            Login
                        </Header>
                        <img
                            src="/illustrations/login.svg"
                            class="block md:(hidden mb-4) max-w-md mx-auto"
                        />
                        <LoginButtons />
                    </Stack>
                </div>
                <div class="w-full md:(flex-1 mt-16)">
                    <img
                        src="/illustrations/login.svg"
                        class="hidden md:(block mb-4)"
                    />
                    <p
                        class="opacity-50"
                    >
                        <Icon 
                            name="info"
                            inline
                            size={18}
                        />{" "}
                        Login to unlock the full potential of Paquet.
                        Access your favorite apps from anywhere, submit 
                        suggestions, and more.
                    </p>
                </div>
            </Container>
        </>
    )
}
