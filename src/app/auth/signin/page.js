import {getProviders} from "next-auth/react"
import GetProvider from "./getprovider/page";


export default async function Signin() {
    const providers = await getProviders();
    return <GetProvider providers = {providers}/>
}